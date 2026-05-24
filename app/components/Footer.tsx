export default function Footer() {
  return (
    <footer
      className="
      bg-linear-to-br 
      from-teal-950 
      via-teal-900 
      to-teal-950 
      text-teal-300 
      pt-16 pb-10
    "
    >
      {/* <footer className="bg-slate-900 text-slate-300 py-10"> */}
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-[#F5E1D0]">
        © {new Date().getFullYear()} Maxirain. All rights reserved.
      </div>
    </footer>
  );
}
