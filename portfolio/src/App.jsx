import './App.css';
import { FaGithub, FaLinkedin, FaTwitter, FaTimes, FaBars } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { useState } from 'react';
import profilePhoto from '../src/Unknown.jpeg';
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-800 text-white p-5">
      <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
          {!isOpen && <h1 className="text-2xl font-bold">Sundaram Dwivedi</h1>}
          {isOpen && (
            <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-lg  md:hidden" />
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
        <nav className={`flex-col md:flex-row md:flex ${isOpen ? 'flex' : 'hidden'} md:space-x-3`}>
          <a href="https://github.com/sundaram08" className="px-3 py-2 hover:bg-blue-600 rounded transition duration-300">
            <FaGithub className="text-2xl" />
          </a>
          <a href="https://www.linkedin.com/in/sundaram-dwivedi" className="px-3 py-2 hover:bg-blue-600 rounded transition duration-300">
            <FaLinkedin className="text-2xl" />
          </a>
          <a href="https://leetcode.com/u/sundaram_08" className="px-3 py-2 hover:bg-blue-600 rounded transition duration-300">
            <SiLeetcode className="text-2xl" />
          </a>
          <a href="https://x.com/sundaram_08" className="px-3 py-2 hover:bg-blue-600 rounded transition duration-300">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="https://drive.google.com/file/d/1-qKB43ILWAs62tx1zovuEUsOWLSlW6so/view" target="_blank" rel="noopener noreferrer" className="px-3 py-2 hover:bg-blue-600 rounded transition duration-300">
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
};

const About = () => {
  return (
    <section id="about" className="p-5 bg-gray-100 text-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-5">About Me</h2>
        <p className="leading-loose">
          I am a Full Stack Engineer with experience in developing scalable web applications using modern technologies.<br />
          <br />
          <span className="font-semibold">JAVA | JAVASCRIPT | NODE JS | REACT | REDUX | SPRINGBOOT | MYSQL | MONGODB | EXPRESS | NEXT JS</span>
        </p>
      </div>
    </section>
  );
};

const projects = [
  {
    title: 'Pustakalaya',
    description: 'Designed "Pustakalaya" with user-friendly features, including JWT token-based login/signup, CRUD operations for book management, and personalized user sections for favorite books. Enhanced user experience by enabling PDF uploads, book deletion, updates, and category-based book filtering, ensuring efficient organization and accessibility of content. Deployed on Vercel for seamless access.',
    link: 'https://pustakalaya-client.vercel.app' // Replace with the actual project link
  },
  {
    title: 'CHAT-ROOM',
    description: 'Developed a real-time chat application leveraging WebSockets, Ably, and the MERN stack, allowing users to initiate chats by entering their username. Implemented a unique message storage feature, enabling messages to be displayed in the chat room for five minutes post-sending, enhancing real-time interaction and ensuring timely communication.',
    link: 'https://chat-room-client-ebon.vercel.app' // Replace with the actual project link
  },
];

const Projects = () => {
  return (
    <section id="projects" className="bg-white p-5">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-5 text-blue-800">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">{project.title}</h3>
              <p className="text-gray-800">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-3 inline-block">
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (message.name === "" || message.email === "" || message.message === "") {
      setErrorMessage("Please fill all the details properly.");
    } else {
      try {
        await axios.post("http://localhost:2000/api/v1/post", message);
        setMessage({
          name: "",
          email: "",
          message: "",
        });
        setErrorMessage(""); // Clear error message if submission successful
      } catch (error) {
        setErrorMessage("Error occurred while submitting the form. Please try again later.");
        console.error(error);
      }
    }
  };

  return (
    <section id="contact" className="p-5 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-5">Contact Me</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="text-red-600">{errorMessage}</div>
          )}
          <div>
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input type="text" id="name" name="name" value={message.name} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={message.email} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded" />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700">Message</label>
            <textarea id="message" name="message" value={message.message} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded"></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition duration-300">Send</button>
        </form>
      </div>
    </section>
  );
};

function App() {
  return (
    <div>
      <Header />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
