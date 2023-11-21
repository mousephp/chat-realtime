import User from "../models/user.model.js"
import Role from "../models/role.model.js"
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    console.log("token::"+token)

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
          if (err) {
            return res.status(401).send({
              message: "Unauthorized!",
          });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    let  userId = req.params.userid;

    User.findById(userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
        {
            _id: { $in: user.roles }
        },
        (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({ message: "Require Admin Role!" });
            return;
        }
        );
    });
};

const isModerator = (req, res, next) => {
    let  userId = req.params.userid;
    User.findById(userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
        {
            _id: { $in: user.roles }
        },
        (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }

            res.status(403).send({ message: "Require Moderator Role!" });
            return;
        }
        );
    });
};

export default {
    verifyToken,
    isAdmin,
    isModerator
}
