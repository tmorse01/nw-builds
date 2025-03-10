# Project Structure

The project is divided into three main directories: `backend`, `frontend`, and `.netlify`.

## Backend

The backend directory contains the server-side code and configurations.

- **Key Files and Directories:**

  - `api/netlify/functions/api.js`: Main API handler using Express and Serverless.
  - `.netlify/edge-functions-import-map.json`: Import map for Netlify edge functions.
  - `netlify.toml`: Netlify configuration file for the backend.
  - `package.json`: Backend dependencies and scripts.

- **API Routes:**
  - `/`: Base route for the API.
  - `/builds`: Route for builds.
  - `/images`: Route for images.
  - `/tags`: Route for tags.

## Frontend

The frontend directory contains the client-side code and configurations.

- **Key Files and Directories:**
  - `.github/workflows/npm_test.yml`: GitHub Actions workflow for running tests.
  - `src/pages/About.page.tsx`: About page component.
  - `package.json`: Frontend dependencies and scripts.
  - `vite.config.mjs`: Vite configuration file.
  - `tsconfig.json`: TypeScript configuration file.

## .netlify

The `.netlify` directory contains Netlify-specific configurations and plugins.

- **Key Files and Directories:**
  - `state.json`: Netlify state file.
  - `plugins/package.json`: Netlify plugins configuration.

# Key Technologies

- **Backend:**

  - Node.js
  - Express
  - Mongoose
  - Serverless

- **Frontend:**
  - React
  - TypeScript
  - Vite

# Build and Deployment

- **Backend:**

  - `npm run build`: Build the backend.
  - `netlify dev --no-open`: Start the backend in development mode.

- **Frontend:**
  - `npm run build`: Build the frontend.
  - `npm test`: Run frontend tests.

# Environment Variables

- **Backend:**

  - `.env`: Environment variables for the backend.

- **Frontend:**
  - `.env.local`: Local environment variables for the frontend.
  - `.env.production.local`: Production environment variables for the frontend.

# Ignored Files

- **Global:**

  - `.netlify`: Local Netlify folder.

- **Backend:**

  - `.netlify`: Local Netlify folder.

- **Frontend:**
  - `.eslintcache`: ESLint cache.
  - `.stylelintcache`: Stylelint cache.
  - `.cache`: Parcel cache.
  - `.parcel-cache`: Parcel cache.
  - `.next`: Next.js build output.
  - `.nuxt`: Nuxt.js build output.
  - `.docusaurus`: Docusaurus cache and generated files.
  - `.serverless`: Serverless directories.
  - `.fusebox`: FuseBox cache.
  - `.dynamodb`: DynamoDB Local files.
  - `.tern-port`: TernJS port file.
  - `.vscode-test`: Stores VSCode versions used for testing VSCode extensions.
  - `.yarn/cache`: Yarn v2 cache.
  - `.yarn/unplugged`: Yarn v2 unplugged.
  - `.yarn/build-state.yml`: Yarn v2 build state.
  - `.yarn/install-state.gz`: Yarn v2 install state.
  - `.pnp.*`: Yarn v2 PnP files.
  - `.DS_Store`: macOS Finder metadata.

# New World Builds Project Guidelines

## Mantine Component Styling Guidelines

When styling Mantine components, use the built-in style props instead of inline `style` objects or deprecated `sx` prop whenever possible. These props connect with the theme system and provide a more consistent approach to styling.

### Preferred Style Props

| Prop                             | CSS Property                                         | Description                                    |
| -------------------------------- | ---------------------------------------------------- | ---------------------------------------------- |
| `m`                              | margin                                               | Sets margin on all sides                       |
| `mt`, `mb`, `ml`, `mr`           | marginTop, marginBottom, marginLeft, marginRight     | Sets margin on specific sides                  |
| `mx`                             | marginInline                                         | Sets horizontal margin                         |
| `my`                             | marginBlock                                          | Sets vertical margin                           |
| `p`                              | padding                                              | Sets padding on all sides                      |
| `pt`, `pb`, `pl`, `pr`           | paddingTop, paddingBottom, paddingLeft, paddingRight | Sets padding on specific sides                 |
| `px`                             | paddingInline                                        | Sets horizontal padding                        |
| `py`                             | paddingBlock                                         | Sets vertical padding                          |
| `bg`                             | background                                           | Sets background color                          |
| `c`                              | color                                                | Sets text color                                |
| `w`, `h`                         | width, height                                        | Sets element dimensions                        |
| `miw`, `mih`                     | minWidth, minHeight                                  | Sets minimum dimensions                        |
| `maw`, `mah`                     | maxWidth, maxHeight                                  | Sets maximum dimensions                        |
| `pos`                            | position                                             | Sets position property (fixed, absolute, etc.) |
| `top`, `left`, `bottom`, `right` | top, left, bottom, right                             | Sets position coordinates                      |

### Example Usage

```tsx
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

// ✅ Use style props instead
<Box
  mt={20}
  p="md"
  bg="white"
  pos="fixed"
  top={20}
>
  Content
</Box>
```

### When to Use `style` Prop

Only use the `style` prop for CSS properties that don't have corresponding style props, such as:

- `zIndex`
- `boxShadow`
- `borderRadius`
- CSS transforms
- Complex selectors

```tsx
// Example of combining style props with style object
<Box
  pos="fixed"
  top={20}
  right={20}
  bg="white"
  p="md"
  style={{
    zIndex: 100,
    borderRadius: "4px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  }}
>
  Content
</Box>
```

### Benefits

- Connects with theme system (spacing scales, color scheme)
- More consistent styling across components
- Better readability and maintainability
- Responsive values support
- TypeScript autocompletion support
