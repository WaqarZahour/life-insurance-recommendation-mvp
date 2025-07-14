# Life Insurance Recommendation App

A responsive web application built with Next.js, TypeScript, and Tailwind CSS that provides personalized life insurance recommendations based on user profile data.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Form Validation**: Input validation for age, income, and dependents
- **Real-time API Integration**: Connects to backend service for recommendations
- **Error Handling**: Comprehensive error handling for network and server issues
- **Modern UI**: Clean, professional interface using Tailwind CSS

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Backend API server running on `http://localhost:3001`

## Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
├── components/           # Reusable UI components
│   ├── InsuranceForm.tsx    # Form component for data collection
│   └── RecommendationDisplay.tsx  # Component for displaying results
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper with global styles
│   └── index.tsx        # Main application page
├── styles/              # Global styles
│   └── globals.css      # Tailwind CSS imports
├── types/               # TypeScript type definitions
│   └── index.ts         # Form data and API response types
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## API Integration

The application expects a backend API server running on `http://localhost:3001` with the following endpoint:

### POST /recommendation

**Request Body:**
```json
{
  "age": 30,
  "annualIncome": 75000,
  "numberOfDependents": 2,
  "riskTolerance": "Medium"
}
```

**Response:**
```json
{
  "recommendedPolicy": "Term Life – $500,000 for 20 years",
  "explanation": "Based on your age, income, and family situation, we recommend a term life policy that provides adequate coverage for your dependents."
}
```

## Form Fields

- **Age**: Number input (18-80 years)
- **Annual Income**: Number input (in USD)
- **Number of Dependents**: Number input (0-10)
- **Risk Tolerance**: Dropdown selection (Low/Medium/High)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

## Error Handling

The application handles various error scenarios:
- Network connectivity issues
- Server errors (4xx, 5xx responses)
- Timeout errors
- Invalid data responses

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- The application uses TypeScript for type safety
- Tailwind CSS is configured with custom primary colors
- Form validation is handled both client-side and server-side
- Responsive design uses Tailwind's responsive utilities
- Error states are clearly communicated to users

## License

This project is for demonstration purposes. Please consult with licensed insurance professionals for actual insurance advice. 