const app = document.getElementById("app");
const Quote = props => {
  let className;
  switch (props.type) {
    case "fill":
      className = `card bg-${props.color}`;
      break;
    case "nofill":
      className = `card ${props.color}`;
      break;
    default:
      className = `${props.color} card-plain`;
  }

  className += props.mview ? " card--masonary" : "";

  return <div className={className}>{props.quote}</div>;
};

// Talk about propTypes
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
  const [masonaryState, setMasonaryState] = React.useState(false);
  const [quotesViewType, setQuotesViewType] = React.useState("fWidth");

  const onViewOptionsChange = ev => {
    setQuotesViewType(ev.target.value);
    const state = ev.target.value === "masonary" ? true : false;
    setMasonaryState(state);
  };

  React.useEffect(() => {
    fetch("https://apis.khalsa.now.sh/quotes")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setQuotes(data);
      });
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
            className={`quotes-container ${
              masonaryState ? "quotes-container--masonary" : ""
            }`}
          >
            {cardStyles.map((style, index) => {
              return (
                <Quote
                  key={index}
                  color={style.color}
                  quote={quotes[index]}
                  type={style.type}
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
