const Footer = () => {
  return (
    <footer className="border-t border-stone-200 py-8 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
      Built with the PokéAPI ·{" "}
      <a
        href="https://jpdeocampo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-red-500/90 underline transition-colors hover:text-red-500 dark:hover:text-red-400"
      >
        Jonathan De Ocampo
      </a>
    </footer>
  );
};
export default Footer;
