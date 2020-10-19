export function Footer() {
  return (
    <footer className="px-10 py-8 text-white bg-black">
      <div className="max-w-2xl mx-auto flex items-center flex-wrap gap-4 md:flex-no-wrap">
        <p className="flex-auto w-full md:flex-none md:w-auto">
          © Senlima Sun 2020
        </p>

        <div className="flex-auto flex gap-6 items-center justify-start md:justify-end">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/senlima0430"
          >
            Github
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/senlima4"
          >
            Twitter
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/senlima/"
          >
            Linkedin
          </a>
        </div>
      </div>
    </footer>
  )
}
