# New World Builds

A comprehensive build sharing platform for New World players. Create, share, and discover optimized character builds for Amazon's MMORPG New World.

**[View Live Website →](https://nw-builds.netlify.app/)**

## 🌟 Features

- Browse community-created character builds
- Filter builds by weapon combinations, attributes, and play style
- Create and publish your own builds
- Tag builds for easy categorization
- User ratings and comments

## 🔧 Tech Stack

### Backend

- Node.js
- Express
- Mongoose
- Serverless Functions (Netlify)

### Frontend

- React
- TypeScript
- Vite
- Mantine UI

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB connection string

### Installation

1. Clone the repository

```bash
git clone https://github.com/tmorse01/nw-builds.git
cd nw-builds
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

4. Create environment files

   - Create `.env` in the backend directory
   - Create `.env.local` in the frontend directory

5. Start the development servers

```bash
# In backend directory
netlify dev --no-open

# In frontend directory (separate terminal)
npm run dev
```

## 📂 Project Structure

The project is divided into three main directories:

- **backend**: Server-side code and API endpoints
- **frontend**: React-based UI and client-side logic
- **.netlify**: Netlify deployment configurations

### Key API Routes

- `/`: Base route for the API
- `/builds`: Route for managing builds
- `/images`: Route for image assets
- `/tags`: Route for build tags and categories

## 🛠️ Development Guidelines

### Mantine UI Styling Best Practices

When styling Mantine components, use the built-in style props instead of inline `style` objects:

```tsx
// ✅ Recommended approach
<Box
  mt={20}
  p="md"
  bg="white"
  pos="fixed"
  top={20}
>
  Content
</Box>

// ❌ Avoid this approach
<Box
  style={{
    marginTop: 20,
    padding: '1rem',
    backgroundColor: 'white',
    position: 'fixed',
    top: '20px'
  }}
>
  Content
</Box>
```

Use the `style` prop only for CSS properties that don't have corresponding style props.

### Common Style Props

| Prop                        | CSS Property       | Description             |
| --------------------------- | ------------------ | ----------------------- |
| `m`, `mt`, `mb`, `ml`, `mr` | margin properties  | Sets margin             |
| `p`, `pt`, `pb`, `pl`, `pr` | padding properties | Sets padding            |
| `bg`                        | background         | Sets background color   |
| `c`                         | color              | Sets text color         |
| `w`, `h`                    | width, height      | Sets element dimensions |

## 🔄 Deployment

The project is configured to deploy on Netlify:

1. Build the frontend

```bash
cd frontend
npm run build
```

2. Deploy using Netlify

```bash
netlify deploy --prod
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
