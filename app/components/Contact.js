// app/components/Contact.js
const Contact = () => {
  return (
    <section id="contact" className="bg-gray-600 py-12 text-white">
      <h2 className="text-3xl font-bold text-center mb-4">Contact</h2>
      <p className="text-center max-w-xl mx-auto mb-6">
        Feel free to reach out to me through the following platforms:
      </p>
      <ul className="text-center space-y-4">
        <li>Email: <a href="mailto:atulkumbhar@example.com" className="underline">atulkumbhar1985@gmail.com</a></li>
        <li>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/atul-kumbhar-393523165/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Atul Kumbhar
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Contact;
