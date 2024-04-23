package com.esprit.pi_project.serviceImpl;


import com.esprit.pi_project.dao.ClubDao;
import com.esprit.pi_project.entities.Club;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.services.ClubService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
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
            Paragraph title = new Paragraph("List of Clubs", fontTitle);
            title.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph("\n"));

            // Define table properties
            PdfPTable table = new PdfPTable(4); // Four columns for Name, Description, Membership Count, and Tag
            table.setWidthPercentage(100); // Set table width to 100% of the page

            // Define table headers with alignment (using PdfPCell)
            // Define table headers with alignment (using PdfPCell)
            PdfPCell headerCell = new PdfPCell(new com.itextpdf.text.Phrase("Name"));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(headerCell);
            headerCell = new PdfPCell(new com.itextpdf.text.Phrase("Description"));
            headerCell.setHorizontalAlignment(Element.ALIGN_LEFT); // Left-align description
            table.addCell(headerCell);
            table.addCell("Membership Count");
            table.addCell("Tag");


            // Add club data as rows
            for (Club club : clubs) {
                // Create cells and set alignment (using PdfPCell)
                PdfPCell nameCell = new PdfPCell(new Phrase(club.getClubName()));
                nameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(nameCell);

                PdfPCell descCell = new PdfPCell(new Phrase(club.getDescription()));
                descCell.setHorizontalAlignment(Element.ALIGN_LEFT); // Left-align description (optional)
                table.addCell(descCell);

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



    public Map<String, Long> countClubsByTag() {
        return clubDao.countClubsByTag();
    }


}
