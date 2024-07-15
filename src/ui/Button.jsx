import { Link } from "react-router-dom"


export default function Button({children, disabled, to, type, onClick}) {

  
  const base = 'text-sm bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300  focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-700  focus:ring-offset-2 disabled:cursor-not-allowed'

  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    small: base + " text-xs px-4 py-2 md:px-5 md:py-2.5",
    secondary: 'text-sm px-2 py-2 md:px-6 md:py-4 border-2 border-stone-300 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300  focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed',
    round: base + " text-xs px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    verySmall: base + "text-[2px] px-0 py-0",
    smallRound: base + "text-xs px-2 py-1 mr-10 md:px-2.5 md:py-1.5",

  }

  if(to){
    return(
      <Link className={styles[type]} to={to}>{children}</Link>
    )
  }

  if(onClick){
    return (
      <button 
        className={styles[type]}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  return (
    <button className={styles[type]}
              disabled={disabled}
              >
      {children}
    </button>
  )
}
