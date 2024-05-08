package com.esprit.pi_project.utilities;
import com.esprit.pi_project.entities.Evenement;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;


import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
public class QRCodeGenerator {

    public static void generateQRCode(Evenement evenement) throws WriterException, IOException {
        String qrCodePath = "src\\main\\resources\\newqrcode\\";
        String qrCodeName = qrCodePath + evenement.getEventName() + evenement.getIdEvent() + "-QRCODE.png";

        // Modify this line to include the link to the form
        String formLink = "http://localhost:4200/listReservationEvent"; // Example form link
        String qrCodeContent = generateQRCodeContent(evenement, formLink);

        var qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrCodeContent, BarcodeFormat.QR_CODE, 400, 400);
        Path path = FileSystems.getDefault().getPath(qrCodeName);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
    }

    private static String generateQRCodeContent(Evenement evenement, String formLink) {
        // Customize the QR code content according to your needs
        return
                "Event Name: " + evenement.getEventName() + "\n" +
                "Event Type: " + evenement.getEventType() + "\n" +
                "Event description: " + evenement.getDescription() + "\n" ;


    }
}
