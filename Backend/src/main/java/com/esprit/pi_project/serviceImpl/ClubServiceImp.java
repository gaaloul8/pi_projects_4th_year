package com.esprit.pi_project.serviceImpl;


import com.esprit.pi_project.dao.ClubDao;
import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.ClubService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ClubServiceImp implements ClubService {

    private ClubDao clubDao;
    @Override
    public Club addClub(MultipartFile imageFile, String clubName, String description, Integer membershipCount, String tag,User user) throws IOException {
        byte[] imageData = imageFile.getBytes();
        String base64Image = Base64.getEncoder().encodeToString(imageData);


        Club club = new Club();
        Tag tagEnum = Tag.valueOf(tag);
        System.out.println("Tag Enum: " + tagEnum); // Add this line to print tagEnum
        club.setImage(base64Image);
        club.setClubName(clubName);
        club.setMembershipCount(membershipCount);
        club.setTag(tagEnum);
        club.setDescription(description);
        club.setUser(user);
        return clubDao.save(club);
    }

    @Override

    public Club updateClub(Long clubId, String clubName, String description, Integer membershipCount, String tag, MultipartFile image, User user) throws IOException {
        Optional<Club> optionalClub = clubDao.findById(clubId);

        Club existingClub = optionalClub.get();
        if (!optionalClub.isPresent()) {

            return null;}

            // Check if image is provided
            if (image != null && !image.isEmpty()) {
                byte[] imageData = image.getBytes();
                String base64Image = Base64.getEncoder().encodeToString(imageData);
                existingClub.setImage(base64Image);
            }

            // Update other fields if provided
            if (clubName != null) {
                existingClub.setClubName(clubName);
            }
            if (description != null) {
                existingClub.setDescription(description);
            }
            if (membershipCount != null) {
                existingClub.setMembershipCount(membershipCount);
            }
            if (tag != null) {
                Tag tagEnum = Tag.valueOf(tag);
                existingClub.setTag(tagEnum);
            }
            existingClub.setUser(user);

            // Save and return updated club
            return clubDao.save(existingClub);
    }


    @Override
    public void deleteClub(Long idClub) {
        Optional<Club> clubOptional = clubDao.findById(idClub);
        if (clubDao.existsById(idClub)) {
            clubDao.deleteById(idClub);
        } else {
            throw new NoSuchElementException("Club with ID " + idClub + " doesn't exist.");
        }
    }


    @Override
    public Club findClubById(Long idClub) {
        return clubDao.findById(idClub).get();
    }

    @Override
    public List<Club> findAllClubs() {
        return clubDao.findAll();
    }

    @Override
    public List<Club> findByTag(Tag tag) {
        return clubDao.findAllByTag(tag);
    }



    public void generateClubsPDF(HttpServletResponse response) {
        List<Club> clubs = clubDao.findAll(); // Fetch all clubs from the database

        try {
            Document document = new Document(PageSize.A4);
            PdfWriter writer = PdfWriter.getInstance(document, response.getOutputStream());

            document.open();

            // Add logo image in the top left corner
            Image logo = Image.getInstance("src/main/java/com/esprit/pi_project/images/logo_espritClaim.png"); // Replace with the path to your logo image
            logo.scaleToFit(100, 100); // Resize the logo as needed
            logo.setAlignment(Element.ALIGN_LEFT); // Align logo to the left
            document.add(logo);

            // Add current date and time in the top right corner
            Paragraph dateParagraph = new Paragraph(new Date().toString());
            dateParagraph.setAlignment(Element.ALIGN_RIGHT);
            document.add(dateParagraph);

            // Add space between logo, date, and title
            document.add(Chunk.NEWLINE);


            // Add title with your website colors (red and white)
            Font fontTitleRed = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontTitleRed.setColor(BaseColor.RED);
            fontTitleRed.setSize(18);

            Paragraph title = new Paragraph("List of Clubs", fontTitleRed);
            title.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(title);

            // Add space between title and table
            document.add(Chunk.NEWLINE);

            // Define table properties
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.getDefaultCell().setBackgroundColor(BaseColor.LIGHT_GRAY);

            // Define table headers with alignment and bold font
            PdfPCell headerCell = new PdfPCell(new Phrase("Name", fontTitleRed)); // Use the same red font for table headers
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(headerCell);

            headerCell = new PdfPCell(new Phrase("Description", fontTitleRed));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(headerCell);

            headerCell = new PdfPCell(new Phrase("Members", fontTitleRed));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(headerCell);

            headerCell = new PdfPCell(new Phrase("Tag", fontTitleRed));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(headerCell);

            // Add club data as rows
            for (Club club : clubs) {
                table.addCell(club.getClubName());
                table.addCell(club.getDescription());
                table.addCell(String.valueOf(club.getMembershipCount()));
                table.addCell(club.getTag().toString());
            }

            // Add the completed table to the document
            document.add(table);
            document.close();
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }
    }


    @Override
    public Map<Tag, Long> countClubsByTag() {
        List<Club> clubs = clubDao.findAll(); // Assuming a method to retrieve all clubs
        Map<Tag, Long> tagStatistics = new HashMap<>();

        for (Club club : clubs) {
            Tag tag = club.getTag();
            tagStatistics.put(tag, tagStatistics.getOrDefault(tag, 0L) + 1);
        }

        return tagStatistics;
    }
    @Override
    public List<Club> findClubsBySearchQuery(String query) {
        return clubDao.findAllByClubNameContainingIgnoreCase(query);
    }




//  public Map<Tag, Long> countClubsByTag() {
//        return clubDao.countClubsByTag();
//  }


}

