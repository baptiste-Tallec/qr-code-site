export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">

      <div className="text-blue-500">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mt-5">
        {title}
      </h3>

      <p className="text-gray-400 mt-3">
        {description}
      </p>

    </div>
  );
}