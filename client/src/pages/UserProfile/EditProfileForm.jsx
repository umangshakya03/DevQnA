import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/users";
import toast from "react-hot-toast";

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Current user data in EditProfileForm:", currentUser?.result); // Debugging log
    if (currentUser?.result) {
      setName(currentUser.result.name || "");
      setAbout(currentUser.result.about || "");
      setSkills(currentUser.result.skills?.join(", ") || "");
      setGithub(currentUser.result.github || "");
      setLinkedin(currentUser.result.linkedin || "");
      setPortfolio(currentUser.result.portfolio || "");
      setLoading(false);
    } else {
      console.warn("currentUser is undefined or does not have a result.");
    }
  }, [currentUser, setSwitch]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const skillsArray = skills.split(",").map((skill) => skill.trim());

    const updatedProfileData = {
      name,
      about,
      skills: skillsArray,
      github: github || currentUser?.result?.github,
      linkedin: linkedin || currentUser?.result?.linkedin,
      portfolio: portfolio || currentUser?.result?.portfolio,
    };

    dispatch(updateProfile(currentUser?.result?._id, updatedProfileData));
    toast.success("Profile updated");
    setSwitch(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-6">
        Edit Your Profile
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Display Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="about"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            About Me
          </label>
          <textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="skills"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Skills (comma-separated)
          </label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="portfolio"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Portfolio URL
          </label>
          <input
            type="text"
            id="portfolio"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="github"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            GitHub URL
          </label>
          <input
            type="text"
            id="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="linkedin"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            LinkedIn URL
          </label>
          <input
            type="text"
            id="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update Profile
          </button>
          <button
            type="button"
            className="px-6 py-3 text-indigo-600 bg-transparent border border-indigo-600 rounded-md"
            onClick={() => setSwitch(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
