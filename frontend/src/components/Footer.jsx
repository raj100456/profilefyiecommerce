import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Profile.fyi E-commerce. All rights
          Reserved.
          {/* reserved. by <span className="text-yellow-400">{"Raj"}</span> */}
        </p>
        <p>
          <a
            href="https://www.linkedin.com/in/rajpatel1456/"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Linkedin
          </a>{" "}
          |{" "}
          <a
            href="mailto:patelrajkumar579@gmail.com"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            patelrajkumar579@gmail.com
          </a>{" "}
          Mob 8446440954
        </p>
      </div>
    </footer>
  );
};

export default Footer;
