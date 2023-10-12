/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { memo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

function Home(props) {
  const [collapseFullscreen, setCollapseFullscreen] = React.useState(false);
  const [isInsert, setIsInsert] = React.useState(false);
  const [isOnForm, setIsOnForm] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState(0);

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
                      sx={{
                        cursor: "pointer",
                        ...(selectedType === 1
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setSelectedType(1);
                        setIsOnForm(false);
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-1-col.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography>One Column</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      mt={0}
                      sx={{
                        cursor: "pointer",
                        ...(selectedType === 2
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setSelectedType(2);
                        setIsOnForm(false);
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-2-col.svg"
                        alt="image"
                        width="100%"
                        height="80px"
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
                      sx={{
                        cursor: "pointer",
                        ...(selectedType === 3
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setSelectedType(3);
                        setIsOnForm(false);
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-image-left.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography>Image Left</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      ml={0}
                      sx={{
                        cursor: "pointer",
                        ...(selectedType === 4
                          ? {
                              border: "2px solid #727CF5",
                            }
                          : {}),
                      }}
                      onClick={() => {
                        setSelectedType(4);
                        setIsOnForm(false);
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-row-image-right.svg"
                        alt="image"
                        width="100%"
                        height="80px"
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
                      onClick={() => {
                        setIsInsert(false);
                        setSelectedType(0);
                      }}
                    >
                      Discard
                    </Button>
                  </Grid>
                  <Grid item md={5.8}>
                    <Button
                      sx={{ border: "1px solid #a0a5aa", color: "#555" }}
                      fullWidth
                      disabled={selectedType === 0}
                      onClick={() => setIsOnForm(true)}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            {isInsert && selectedType === 1 && isOnForm && <></>}

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

        <Grid item xs={collapseFullscreen ? 12 : 8.5} position="relative">
          <Typography variant="h3" color="secondary">
            Add Card
          </Typography>
          <Box
            sx={{
              background: "#555555",
              width: "100%",
              height: "80vh",
              marginTop: "30px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {isInsert && selectedType === 1 && isOnForm && (
              <Box
                sx={{
                  minHeight: "50%",
                  width: "100%",
                  backgroundColor: "rgb(193, 193, 193)",
                  border: "3px dashed #00a3d3",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                  >
                    Add elements
                  </Box>
                </Box>
              </Box>
            )}

            {isInsert && selectedType === 2 && isOnForm && (
              <Box
                sx={{
                  minHeight: "50%",
                  width: "100%",
                  backgroundColor: "rgb(193, 193, 193)",
                  border: "3px dashed #00a3d3",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                  >
                    Add elements
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                  >
                    Add elements
                  </Box>
                </Box>
              </Box>
            )}

            {isInsert && selectedType === 3 && isOnForm && (
              <Box
                sx={{
                  minHeight: "50%",
                  width: "100%",
                  backgroundColor: "rgb(193, 193, 193)",
                  border: "3px dashed #00a3d3",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                  >
                    Upload Image
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                  >
                    Add elements
                  </Box>
                </Box>
              </Box>
            )}

            {isInsert && selectedType === 4 && isOnForm && (
              <Box
                sx={{
                  minHeight: "50%",
                  width: "100%",
                  backgroundColor: "rgb(193, 193, 193)",
                  border: "3px dashed #00a3d3",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                  >
                    Add elements
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    minHeight: "380px",
                    backgroundColor: "rgb(193, 193, 193)",
                    border: "3px dashed #00a3d3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "#00a3d3",
                      cursor: "pointer",
                    }}
                  >
                    Upload Image
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
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
