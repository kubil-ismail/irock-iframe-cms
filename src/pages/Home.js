/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { memo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

function Home(props) {
  const [collapseFullscreen, setCollapseFullscreen] = React.useState(false);
  const [isInsert, setIsInsert] = React.useState(true);

  return (
    <Box p={2}>
      <Grid container>
        {!collapseFullscreen && (
          <Grid item xs={3} position="relative">
            <Typography variant="h4" color="secondary">
              Event Page
            </Typography>
            {!isInsert && (
              <Button
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: "50px", borderWidth: "2px", mt: "30px" }}
                onClick={() => setIsInsert(true)}
              >
                + Add Layout
              </Button>
            )}

            {isInsert && (
              <>
                <Typography sx={{ mt: 2 }}>Insert Layout</Typography>

                <Box
                  sx={{
                    borderBottom: "2px solid #00a3d3",
                    mt: 1,
                    width: "98%",
                    mb: 2,
                  }}
                />

                <Grid container>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      mt={0}
                      ml={0}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-1-col.svg"
                        alt="image"
                        width="100%"
                      />
                      <Typography>One Column</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box border="1px solid #00a3d3" m={1} p={1} pt={0} mt={0}>
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-2-col.svg"
                        alt="image"
                        width="100%"
                      />
                      <Typography>2 Column</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      mt={0}
                      mr={1}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-image-left.svg"
                        alt="image"
                        width="100%"
                      />
                      <Typography>Image Left</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box border="1px solid #00a3d3" m={1} p={1} pt={0} ml={0}>
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-image-right.svg"
                        alt="image"
                        width="100%"
                      />
                      <Typography>Image Right</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    borderTop: "2px solid rgb(56 56 56 / 14%)",
                    mt: 1,
                    width: "98%",
                    mb: 2,
                  }}
                />

                <Grid container gap={1} justifyContent="space-between" px={1}>
                  <Grid item md={5.8}>
                    <Button
                      sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                      fullWidth
                    >
                      Discard
                    </Button>
                  </Grid>
                  <Grid item md={5.8}>
                    <Button
                      sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                      fullWidth
                      disabled
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            <Box
              position="absolute"
              borderTop="1px solid #cacaca"
              width="95%"
              bottom={0}
              pt="10px"
            >
              <Button
                sx={{ backgroundColor: "#ff0016", color: "#fff", mr: 1, px: 3 }}
              >
                Save
              </Button>
              <Button sx={{ backgroundColor: "#727cf5", color: "#fff", px: 3 }}>
                Cancel
              </Button>
            </Box>
          </Grid>
        )}

        <Grid item xs={collapseFullscreen ? 12 : 9} position="relative">
          <Typography variant="h3" color="secondary">
            Add Card
          </Typography>
          <Box
            sx={{
              background: "#555555",
              width: "100%",
              height: "80vh",
              marginTop: "30px",
            }}
          />
          <Box
            sx={{
              background: "#1010109e",
              display: "flex",
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: -15,
              bottom: 10,
              cursor: "pointer",
            }}
            onClick={() => setCollapseFullscreen(!collapseFullscreen)}
          >
            {!collapseFullscreen ? (
              <ArrowBackIosRoundedIcon
                htmlColor="#b9b9b9"
                fontSize="20px"
                sx={{ marginLeft: "-2px" }}
              />
            ) : (
              <ArrowForwardIosRoundedIcon
                htmlColor="#b9b9b9"
                fontSize="20px"
                sx={{ marginLeft: "-2px" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

Home.propTypes = {};

const mapStateToProps = (state) => ({
  example: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home));
