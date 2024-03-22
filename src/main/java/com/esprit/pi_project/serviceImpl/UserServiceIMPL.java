package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.UserDao;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor


public class UserServiceIMPL implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public List<User> getAll() {
        return userDao.findAll();
    }

    @Override
    public void deleteUser(User user) {
        userDao.delete(user);
    }

    @Override
    public User findById(Integer id) {
        if (id != null) {
            final Optional<User> User = userDao.findById(id);
            if (User.isPresent()) {
                return User.get();
            }
        }
        return null;
    }

    @Override
    public User updateProfile(User user) {
        Optional<User> UserToupdate = userDao.findById(user.getId_user());

        if (UserToupdate.isPresent()) {
            User user3 = UserToupdate.get();

            user3.setFirstName(user.getFirstName());
            user3.setLastName(user.getLastName());
            user3.setEmail(user.getEmail());


            return userDao.save(user3);
        } else {

            return null;
        }

    }
}
