export default function Stat({ stat }) {
  return (
    <div className="text-center md:pr-[71px]">
      <h1 className="font-hanken_grotesk text-3xl font-semibold text-stroke md:text-6xl">
        {stat.value}{stat.icon}
      </h1>
      <p className="mt-0.5 md:text-2xl text-text-light">{stat.label}</p>
    </div>
  );
}
