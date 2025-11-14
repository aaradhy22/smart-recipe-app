import { useState } from 'react';

// --- New "Gourmet Chef" Style Object ---
const styles = {
  // Page: A dark, sophisticated "slate" background
  page: {
    minHeight: '100vh',
    padding: '3rem 1rem',
    background: 'linear-gradient(135deg, #2d3436 0%, #1d1e21 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    fontFamily: "'Poppins', sans-serif",
  },
  

  // Card: A bright "marble" or "parchment" card that stands out
  card: {
    width: '100%',
    maxWidth: '720px',
    padding: '2.5rem',
    borderRadius: '16px',
    background: 'linear-gradient(145deg, #fdfbfb 0%, #ebedee 100%)',
    boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
    animation: 'fadeIn 0.8s ease-out',
  },

  // Heading: A strong, dark "espresso" color
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#3d3d3d',
    letterSpacing: '1px',
  },

  form: {
    display: 'grid',
    gap: '1.25rem',
  },

  // Label: A clear, secondary text color
  label: {
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#596275',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  // Input: Clean, light, and recessed
  input: {
    padding: '0.9rem 1rem',
    border: '1px solid #dfe6e9',
    borderRadius: '8px',
    fontSize: '1rem',
    background: '#ffffff',
    color: '#3d3d3d',
    transition: '0.25s all ease',
  },

  // Input Focus: A warm "gold" accent
  inputFocus: {
    borderColor: '#c59d5f',
    boxShadow: '0 0 10px rgba(197, 157, 95, 0.3)',
    outline: 'none',
  },

  // Button: A "copper/gold" gradient
  button: {
    marginTop: '1rem',
    padding: '1rem',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #e6b88a 0%, #c59d5f 100%)',
    color: '#3d3d3d',
    fontWeight: '700',
    letterSpacing: '1px',
    boxShadow: '0 4px 15px rgba(197, 157, 95, 0.25)',
    transition: 'all 0.25s ease',
  },

  // Button Hover: A subtle lift and glow
  buttonHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 20px rgba(197, 157, 95, 0.4)',
  },

  buttonDisabled: {
    transform: 'none',
    boxShadow: 'none',
    background: '#b2bec3',
    cursor: 'not-allowed',
    opacity: 0.7,
  },

  // Loading: Themed loading text
  loading: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#c59d5f',
  },

  // Error: Clear error styling
  error: {
    marginTop: '1.5rem',
    textAlign: 'center',
    color: '#e53935',
    fontWeight: '600',
    background: '#ffebee',
    padding: '0.75rem',
    borderRadius: '8px',
  },

  // Result Box: A clean box with a gold accent border
  resultBox: {
    marginTop: '2.5rem',
    padding: '1.5rem',
    borderRadius: '12px',
    background: '#f8f9fa',
    border: '1px dashed #c59d5f',
    color: '#3d3d3d',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.7',
    fontSize: '0.95rem',
    animation: 'fadeIn 0.5s ease',
  },

  // Result Heading: Gold accent color
  resultHeading: {
    fontSize: '1.4rem',
    marginBottom: '1rem',
    fontWeight: '600',
    color: '#c59d5f',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '0.5rem',
  },
};

// We need to inject the keyframes for the fadeIn animation
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);


function App() {
  const [ingredients, setIngredients] = useState('Chicken, Onion, Garlic');
  const [cuisine, setCuisine] = useState('Italian');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('none');

  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- State for hover and focus ---
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecipe('');

    const params = new URLSearchParams({
      ingredients,
      cuisine,
      dietaryRestrictions,
    });

    fetch(`http://localhost:8080/recipe-creator?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Server unreachable. Please check backend.');
        }
        return response.text();
      })
      .then((data) => {
        setRecipe(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  // --- Dynamic Style Functions ---
  const getButtonStyle = () => {
    let style = { ...styles.button };
    if (isLoading) {
      style = { ...style, ...styles.buttonDisabled };
    } else if (isButtonHovered) {
      style = { ...style, ...styles.buttonHover };
    }
    return style;
  };

  const getInputStyle = (inputName) => {
    let style = { ...styles.input };
    if (focusedInput === inputName) {
      style = { ...style, ...styles.inputFocus };
    }
    return style;
  };


  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.heading}>Culinary Creator 🧑‍🍳</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>Ingredients</label>
            <input
              type="text"
              style={getInputStyle('ingredients')}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              onFocus={() => setFocusedInput('ingredients')}
              onBlur={() => setFocusedInput(null)}
              required
            />
          </div>

          <div>
            <label style={styles.label}>Cuisine Preference</label>
            <input
              type="text"
              style={getInputStyle('cuisine')}
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              onFocus={() => setFocusedInput('cuisine')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          <div>
            <label style={styles.label}>Dietary Restrictions</label>
            <input
              type="text"
              style={getInputStyle('diet')}
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              onFocus={() => setFocusedInput('diet')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          <button
            type="submit"
            style={getButtonStyle()}
            disabled={isLoading}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {isLoading ? 'Simmering...' : 'Create My Dish 🍲'}
          </button>
        </form>

        {isLoading && <p style={styles.loading}>Preheating the oven... ⏳</p>}
        {error && <p style={styles.error}>{error}</p>}

        {recipe && (
          <div style={styles.resultBox}>
            <h3 style={styles.resultHeading}>Your Custom Recipe</h3>
            <pre>{recipe}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;