import BackButton from "./BackButton";

const CreateHeader = ({ title = " جدید" }) => {
  return (
    <header className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-2xl shadow-md mb-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-blue-800">{title}</h1>
        <span className="text-xl"><BackButton></BackButton></span>
    </header>
  );
};

export default CreateHeader;