package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Activity;
import com.esprit.pi_project.services.ActivityService;
import com.esprit.pi_project.services.CloudinaryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("activity")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")

public class ActivityController {
    @Autowired
    ActivityService activityService;
    @Autowired
    CloudinaryService cloudinaryService;


    @PostMapping("/{id}/activity")
    public void addActivity(@RequestBody Activity activity, @PathVariable Integer id) {


        activityService.addActivity(activity,id);

    }
    @GetMapping("all")
    public List<Activity> retrieveAllActivities() {

        return activityService.getAll();
    }

    @GetMapping("allByQuiz/{id}")
    public List<Activity> retrieveAllActivitiesByQuiz(@PathVariable Integer id) {

        return activityService.getAllActivitiesByQuizId(id);
    }

    @PutMapping("update")
    @ResponseBody
    public Activity updateActivity (@RequestBody Activity activity){
        return  activityService.updateActivity(activity);
    }
    @GetMapping("getActivity/{idActivity}")
    public Activity findById(@PathVariable Integer idActivity) {

        return activityService.findById(idActivity);
    }
    @DeleteMapping("delete")
    @ResponseBody
    public void delete (@RequestBody Activity activity ){
        this.activityService.removeActivity(activity);
    }


    @GetMapping("/list")
    public ResponseEntity<List<Activity>> list(){
        List<Activity> list = activityService.getAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @PostMapping("/upload/{id}")
    @ResponseBody
    public ResponseEntity<String> upload(@RequestParam MultipartFile multipartFile,@PathVariable Integer id,@RequestParam String activityJson) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        Activity activity = objectMapper.readValue(activityJson, Activity.class);

        MediaType mediaType = MediaType.parseMediaType(multipartFile.getContentType());
        if (!mediaType.equals(MediaType.IMAGE_JPEG) && !mediaType.equals(MediaType.IMAGE_PNG) && !mediaType.equals(MediaType.IMAGE_GIF) && !mediaType.equals(MediaType.valueOf("video/mp4"))) {
            return new ResponseEntity<>("Type de fichier non pris en charge!", HttpStatus.BAD_REQUEST);
        }
       if (mediaType.getType().startsWith("image")) {
            BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
            if (bi == null) {
                return new ResponseEntity<>("Image non valide!", HttpStatus.BAD_REQUEST);
            }
        }

       System.out.println("helloo");
        Map result = cloudinaryService.upload(multipartFile);

        activity.setName((String) result.get("original_filename"));
        activity.setImageId((String) result.get("public_id"));
        activity.setImageUrl((String) result.get("url"));


        activityService.addActivity(activity, id);
        return new ResponseEntity<>("image ajoutée avec succès ! ", HttpStatus.OK);
    }
    /*public ResponseEntity<String> upload(@RequestParam MultipartFile multipartFile,@PathVariable Integer id,@RequestParam String activityJson) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        Activity activity = objectMapper.readValue(activityJson, Activity.class);
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            return new ResponseEntity<>("Image non valide!", HttpStatus.BAD_REQUEST);
        }
        Map result = cloudinaryService.upload(multipartFile);

        activity.setName((String) result.get("original_filename"));
        activity.setImageId((String) result.get("public_id"));
        activity.setImageUrl((String) result.get("url"));


        activityService.addActivity(activity,id);
        return new ResponseEntity<>("image ajoutée avec succès ! ", HttpStatus.OK);
    }*/

    @DeleteMapping("/deleteactivity")
    public ResponseEntity<String> deleteActivity(@RequestBody Activity activite) {
        Activity activity = activityService.findById(activite.getIdActivity());


        String cloudinaryImageId = activity.getImageId();
        try {
            cloudinaryService.delete(cloudinaryImageId);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to delete image from Cloudinary", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        activityService.removeActivity(activity);
        return new ResponseEntity<>("image supprimée !", HttpStatus.OK);
    }
}
