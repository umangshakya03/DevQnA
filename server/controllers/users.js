import mongoose from "mongoose";
import Users from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        skills: user.skills,
        portfolio: user.portfolio || "", // Added portfolio
        github: user.github || "",
        linkedin: user.linkedin || "",
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, skills, github, linkedin, portfolio } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User unavailable...");
  }

  try {
    const updatedProfile = await Users.findByIdAndUpdate(
      _id,
      {
        $set: {
          name,
          about,
          skills,
          portfolio,
          github,
          linkedin,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
