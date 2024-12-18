import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import HTMLReactParser from "html-react-parser";

const ProfileBio = ({ currentProfile }) => {
  if (!currentProfile) {
    return <p className="text-gray-600">Profile data is unavailable.</p>;
  }

  const truncatedAbout =
    currentProfile.about?.length > 200
      ? currentProfile.about.substring(0, 200) + "..."
      : currentProfile.about;

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {/* About Section */}
      <div>
        {currentProfile.about ? (
          <>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">About</h4>
            <p className="text-gray-700">{HTMLReactParser(truncatedAbout)}</p>
            {currentProfile.about.length > 200 && (
              <p className="text-indigo-600 mt-2 cursor-pointer hover:underline">
                Read more
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-600">No bio found</p>
        )}
      </div>

      {/* Skills Section */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Skills</h4>
        {currentProfile.skills && currentProfile.skills.length > 0 ? (
          <div className="flex flex-wrap gap-3 mt-2">
            {currentProfile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm font-medium shadow-md transition duration-200 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No skills provided</p>
        )}
      </div>

      {/* Portfolio, GitHub, and LinkedIn Sections */}
      <div className="mt-4 space-y-4">
        {currentProfile.portfolio && (
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Portfolio
            </h4>
            <a
              href={currentProfile.portfolio}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline flex items-center gap-1"
            >
              {currentProfile.portfolio}
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
        )}

        {currentProfile.github && (
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">GitHub</h4>
            <a
              href={currentProfile.github}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline flex items-center gap-1"
            >
              {currentProfile.github}
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
        )}

        {currentProfile.linkedin && (
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              LinkedIn
            </h4>
            <a
              href={currentProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline flex items-center gap-1"
            >
              {currentProfile.linkedin}
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBio;
