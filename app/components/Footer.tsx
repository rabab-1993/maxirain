export default function Footer() {
  return (
     <footer
      className="
      bg-linear-to-br 
      from-slate-950 
      via-slate-900 
      to-blue-950 
      text-slate-300 
      pt-16 pb-10
    "
    >
   {/* <footer className="bg-slate-900 text-slate-300 py-10"> */}
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        © {new Date().getFullYear()} Maxirain. All rights reserved.
      </div>
    </footer>
  );
}
