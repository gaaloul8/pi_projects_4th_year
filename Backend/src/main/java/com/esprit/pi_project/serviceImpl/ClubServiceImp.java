package com.esprit.pi_project.serviceImpl;
import com.esprit.pi_project.dao.ClubDao;
import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.services.ClubService;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ClubServiceImp implements ClubService {

    private ClubDao clubDao;
    @Override
    public Club addClub(Club club) {
       return  clubDao.save(club);
    }

    public Club updateClub(Club club) {
        return clubDao.save(club);
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

    @Override
    public List<Club> findAllByClubName(String clubName) {
        return clubDao.findAllByClubName(clubName);
    }
    public void generateClubsPDF(HttpServletResponse response) {
        List<Club> clubs = clubDao.findAll(); // Fetch all clubs from the database

        try {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();
            Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA);
            fontTitle.setSize(18);

            // Add title
            Paragraph title = new Paragraph("List of Clubs",fontTitle);
            title.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(title);

            // Add clubs data
            for (Club club : clubs) {
                Paragraph clubInfo = new Paragraph();
                clubInfo.setAlignment(Paragraph.ALIGN_LEFT);
                clubInfo.add("Name: " + club.getClubName() + "\n");
                clubInfo.add("Description: " + club.getDescription() + "\n");
                clubInfo.add("Membership Count: " + club.getMembershipCount() + "\n");
                clubInfo.add("Tag: " + club.getTag() + "\n\n");
                document.add(title);
                document.add(clubInfo);

            }

            document.close();
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }}


}
