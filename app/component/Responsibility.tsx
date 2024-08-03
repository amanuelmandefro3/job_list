import { FaRegCheckCircle } from "react-icons/fa";
interface Props {
  responsibilities: string[];
}

const Responsibility = ({ responsibilities }: Props) => {
  return (
    <ul>
      {responsibilities.map((responsibility, index) => (
        <li key={index} className="flex gap-2 mb-1">
          {" "}
          <FaRegCheckCircle size={24} color="#15803d" />
          <p>{responsibility}</p>
        </li>
      ))}
    </ul>
  );
};

export default Responsibility;
