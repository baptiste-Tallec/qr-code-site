export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="group bg-[#111827] border border-gray-800 hover:border-blue-600/50 rounded-3xl p-6 transition hover:-translate-y-1">

      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mt-5">
        {title}
      </h3>

      <p className="text-gray-400 mt-3 leading-relaxed">
        {description}
      </p>

    </div>
  );
}