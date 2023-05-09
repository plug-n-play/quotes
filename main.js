const _quotes = [
  {
    author: 'Nelson Mandela',
    quotation: `It always seems impossible until it's done.`,
  },
  {
    author: `Walt Disney`,
    quotation: 'If you can dream it, you can do it',
  },
  {
    author: `O S Marden`,
    quotation: 'A will finds a way',
  },
  {
    author: `Ralph M`,
    quotation: 'What you do today can improve all your tomorrows',
  },
  {
    author: `Eleanor R`,
    quotation: 'With the new day comes new strength and new thoughts',
  },
  {
    author: `Amelia E`,
    quotation: 'The most effective way to do it is to do it',
  },
  {
    author: 'Sam L',
    quotation: `Don't walk the clock; do what it does. Keep going.`,
  },
  {
    author: 'Theodore R',
    quotation: `Keep your eyes on the stars, and your feet on the ground.`,
  },
  {
    author: 'Rabindranath Tagore',
    quotation: `You can't cross the sea merely by standing and staring at the water`,
  },
  {
    author: `Jim Rohn`,
    quotation: 'Either you run the day or the day runs you',
  },
]

const app = document.getElementById("app");
const Quote = ({ color, mview, quote, type, author }) => {
  let className;
  switch (type) {
    case "fill":
      className = `card bg-${color}`;
      break;
    case "nofill":
      className = `card ${color}`;
      break;
    default:
      className = `${color} card-plain`;
  }

  className += mview ? " card--masonary" : "";

  return <div className={className}>{quote?.quotation} - {quote?.author}</div>;
};

const viewOptionsJSON = {
  heading: "View Type",
  options: [
    { text: "Full width", value: "fWidth" },
    { text: "Masonary", value: "masonary" }
  ]
};

const cardStyles = [
  {
    color: "blue",
    type: "nofill"
  },
  {
    color: "red",
    type: "nofill"
  },
  {
    color: "white",
    type: "nofill"
  },
  {
    color: "green",
    type: "nofill"
  },
  {
    color: "pink",
    type: "fill"
  },
  {
    color: "blue",
    type: "fill"
  },
  {
    color: "green",
    type: "fill"
  },
  {
    color: "red",
    type: "fill"
  },
  {
    color: "blue",
    type: "nofill"
  },
  {
    color: "green",
    type: "nofill"
  }
];

const ViewOptions = ({ heading, options, selected, onChange }) => {
  return (
    <div className="pollOption">
      <h3>{heading}</h3>
      {options.map((choice, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name="vote"
              value={choice.value}
              key={index}
              checked={selected === choice.value}
              onChange={onChange}
            />
            <span>{choice.text}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [quotes, setQuotes] = React.useState(null);
  const url = 'https://3qn1qi6i5g.execute-api.us-east-1.amazonaws.com/quotes';
  const _url = "https://iyzczmj29i.execute-api.us-east-1.amazonaws.com/prod/pets/";
  const [masonaryState, setMasonaryState] = React.useState(false);
  const [quotesViewType, setQuotesViewType] = React.useState("fWidth");

  const onViewOptionsChange = ev => {
    setQuotesViewType(ev.target.value);
    const state = ev.target.value === "masonary" ? true : false;
    setMasonaryState(state);
  };
  
  React.useEffect(() => {
    try {
      // debugger;
      // fetch(url, { method: "GET", mode: 'no-cors', headers: { 'Content-Type': 'application/json',}})
      fetch(url)
      .then(response => response.json())
      .then(data => {
        // debugger;
        console.log(data);
        setQuotes(JSON.parse(data.body));
        // debugger;
      });
    } catch(e) {
      debugger;
      setQuotes(_quotes);
    }
    
  }, []);

  return (
    quotes && (
      <>
        <h1>Quotes</h1>

        <div className="container">
          <aside className="options-container">
            <ViewOptions
              heading={viewOptionsJSON.heading}
              options={viewOptionsJSON.options}
              onChange={onViewOptionsChange}
              selected={quotesViewType}
            />
          </aside>

          <div
            className={`quotes-container ${masonaryState ? "quotes-container--masonary" : ""
              }`}
          >
            {cardStyles.map(({ color, type }, index) => {
              return (
                <Quote
                  key={index}
                  color={color}
                  quote={quotes[index]}
                  type={type}
                  mview={masonaryState}
                />
              );
            })}
          </div>
        </div>
      </>
    )
  );
};

ReactDOM.render(<App />, app);
