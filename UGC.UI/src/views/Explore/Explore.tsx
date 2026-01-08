import { useSearchParams } from "react-router";

// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// ==============================|| EXPLORE PAGE ||============================== //

export const Explore = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const type = searchParams.get("type");
  const action = searchParams.get("action");

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Explore
        </Typography>

        {query && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Search results for: <strong>{query}</strong>
          </Typography>
        )}

        {type === "creator" && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Finding creators...
          </Typography>
        )}

        {action === "become-creator" && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Become a creator page coming soon...
          </Typography>
        )}

        {!query && !type && !action && (
          <Typography variant="body1" color="text.secondary">
            Browse and discover content
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Explore;
