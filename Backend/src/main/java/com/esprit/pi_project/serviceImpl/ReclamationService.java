package com.esprit.pi_project.serviceImpl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.esprit.pi_project.dao.ReclamationDao;
import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.entities.Reclamation;
import com.esprit.pi_project.entities.ReclamationStatus;
import com.esprit.pi_project.entities.Role;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReclamationService implements IReclamationService{
    private ReclamationDao reclamationRepository;
    private UserDao userRepository;
    @Autowired
    private MailSendService mailSendService;
    private static List<String> badWords = Arrays.asList("hell", "shit", "bhim");

    @Autowired
    private TwilioService twilioService ;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private UserService userService;

    @Override
    public Reclamation createReclamation(Reclamation reclamation, MultipartFile imageFile,  HttpServletRequest request) throws IOException {
        Optional<User> user = userService.getUserFromJwt(request);

        if(user.isPresent()) {
            var id = user.get().getId_user();

            int occ = 0;

            // Set the club name from the user's associated club
            if (user.get().getClub() != null) {
                reclamation.setClubName(user.get().getClub().getClubName());
            }

            reclamation.setStatus(ReclamationStatus.SUBMITTED);
            reclamation.setCreatedBy(user.get());
            reclamation.setArchived(false);
            reclamation.setCreatedAt(new Date(System.currentTimeMillis()));
            reclamation.setDescription(filterBadWords(reclamation.getDescription()));
            if (imageFile != null && !imageFile.isEmpty()) {
                Map uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.emptyMap());
                reclamation.setImageUrl((String) uploadResult.get("url"));
            }

            if (reclamation.getDescription().contains("******")) {
                List<Reclamation> listrecUser = reclamationRepository.findByCreatedBy(user.get());
                for (Reclamation r : listrecUser) {
                    if (r.getDescription().contains("******")) {
                        occ++;
                    }
                }
                if (occ >= 2) {
                    mailSendService.sendEmail(user.get().getEmail(), "you can't type bad  words in reclamtion ", "Bad words");
                }
            }
        }
            return reclamationRepository.save(reclamation);

    }

    @Override
    public Reclamation updateReclamation(int id, Reclamation reclamationDetails) {
        Reclamation reclamation = reclamationRepository.findById(id).orElse(null);

        if (reclamation == null) {
            return null;
        }else {
            reclamation.setTitle(reclamationDetails.getTitle());
            reclamation.setDescription(filterBadWords(reclamationDetails.getDescription()));
            reclamation.setStatus(reclamationDetails.getStatus());
        }

        return reclamationRepository.save(reclamation);
    }

    @Override
    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    @Override
    public Reclamation getReclamationById(int id) {
        return reclamationRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteReclamation(int id) {
        Reclamation reclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reclamation not found with id " + id));
        reclamationRepository.delete(reclamation);
    }
    @Override
    public Reclamation updateReclamationStatus(int id, ReclamationStatus newStatus) {
        Reclamation reclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reclamation not found with id " + id));
//        twilioService.sendSMS("+21622800427", "your reclamtion status is upated check it\n");
        reclamation.setStatus(newStatus);
        return reclamationRepository.save(reclamation);
    }

    @Override
    public void archiveReclamation(int id) {
        Reclamation reclamation = reclamationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reclamation not found with id " + id));

        reclamation.setArchived(true);
        reclamationRepository.save(reclamation);
    }
    @Override
    public List<Reclamation> getAllReclamations(boolean includeArchived) {
        if (includeArchived) {
            return reclamationRepository.findByIsArchivedTrue();
        } else {
            return reclamationRepository.findByIsArchivedFalse();
        }
    }


    public String uploadImage(MultipartFile file) throws IOException {
        File uploadedFile = convertMultiPartToFile(file);
        Map uploadResult = cloudinary.uploader().upload(uploadedFile, ObjectUtils.emptyMap());
        uploadedFile.delete(); // Clean up temporary file
        return uploadResult.get("url").toString();
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    @Override
    public List<Reclamation> getOldestReclamations() {
        return reclamationRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Reclamation::getCreatedAt))
                .collect(Collectors.toList());
    }

    @Override
    public List<Reclamation> getNewestReclamations() {
        return reclamationRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Reclamation::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<Reclamation> searchReclamationsByTitle(String title) {
        return reclamationRepository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public List<Reclamation> getReclamationsByUserId(Integer userId) {
        return reclamationRepository.findByCreatedById_userAndArchivedIsFalse(userId);
    }

    public Map<String, Long> getReclamationStatisticss() {
        Long submittedCount = reclamationRepository.countByStatus(ReclamationStatus.SUBMITTED);
        Long inProgressCount = reclamationRepository.countByStatus(ReclamationStatus.IN_PROGRESS);
        Long resolvedCount = reclamationRepository.countByStatus(ReclamationStatus.RESOLVED);

        Map<String, Long> stats = new HashMap<>();
        stats.put("submitted", submittedCount);
        stats.put("inProgress", inProgressCount);
        stats.put("resolved", resolvedCount);

        return stats;
    }

    @Override
    public Map<String, Map<String, Long>> getReclamationStatistics() {
        List<Object[]> results = reclamationRepository.countMonthlyReclamationsGroupedByStatus();

        Map<String, Map<String, Long>> statistics = new HashMap<>();

        results.forEach(result -> {
            String status = ((ReclamationStatus) result[0]).name();
            String year = Integer.toString((Integer) result[1]);
            String month = String.format("%02d", (Integer) result[2]);
            Long count = (Long) result[3];

            String yearMonth = year + "-" + month;

            Map<String, Long> counts = statistics.computeIfAbsent(status, k -> new HashMap<>());
            counts.put(yearMonth, count);
        });

        return statistics;
    }


    // Method to assign reclamation to a manager
    @Override
    public Reclamation assignReclamationToManager(int reclamationId, int managerId) {
        Reclamation reclamation = reclamationRepository.findById(reclamationId)
                .orElseThrow(() -> new RuntimeException("Reclamation not found"));
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (manager.getRole() != Role.ClubManager) {
            throw new RuntimeException("Assigned user is not a manager");
        }

        reclamation.setSubmittedTo(manager);
        reclamation.setStatus(ReclamationStatus.IN_PROGRESS);

        return reclamationRepository.save(reclamation);
    }


    // Method to get all managers
    @Override
    public List<User> getAllManagers() {
        return userRepository.findByRole(Role.ClubManager);
    }


    @Override
    public List<Reclamation> getReclamationsAssignedToUser(int userId) {
        return reclamationRepository.findBySubmittedToId_user(userId);
    }

    @Override
    public Reclamation resolveReclamation(int reclamationId) {
        Reclamation reclamation = reclamationRepository.findById(reclamationId)
                .orElseThrow(() -> new RuntimeException("Reclamation not found with id " + reclamationId));

        reclamation.setStatus(ReclamationStatus.RESOLVED);
        return reclamationRepository.save(reclamation);
    }
    @Override
    public Reclamation inProgressReclamation(int reclamationId) {
        Reclamation reclamation = reclamationRepository.findById(reclamationId)
                .orElseThrow(() -> new RuntimeException("Reclamation not found with id " + reclamationId));

        reclamation.setStatus(ReclamationStatus.IN_PROGRESS);
        return reclamationRepository.save(reclamation);
    }



    //@Scheduled(cron = "0 0 12 * * SUN") // Every Sunday at noon
    //repeat every 10 seconds
    @Scheduled(fixedRate = 30000)
    public void reportWeeklyReclamations() {
        LocalDate now = LocalDate.now();
        LocalDate startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = now.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        long count = reclamationRepository.countByCreatedAtBetween(startOfWeek.atStartOfDay(), endOfWeek.atTime(23, 59, 59));
        String message= "Number of reclamations created this week: " + count;
        addUpcomingEventMessage(message);
        System.out.println("Number of reclamations created this week: " + count);
    }

    private List<String> upcomingEventMessages ;

    public void addUpcomingEventMessage(String message) {
        upcomingEventMessages.add(message);
    }

    public List<String> getUpcomingEventMessages() {
        return new ArrayList<>(upcomingEventMessages);
    }

    public static String filterBadWords(String input) {
        StringBuilder filteredText = new StringBuilder(input);

        for (String badWord : badWords) {
            // Crée une chaîne de caractères avec autant d'astérisques que la longueur du mot interdit
            String replacement = "******";

            // Remplace toutes les occurrences du mot interdit par la chaîne d'astérisques dans le texte
            filteredText = new StringBuilder(filteredText.toString().replaceAll("(?i)" + badWord, replacement));
        }

        return filteredText.toString();
    }
}
