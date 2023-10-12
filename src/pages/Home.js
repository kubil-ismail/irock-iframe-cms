/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { memo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  ListItemButton,
  List,
  Typography,
  TextField,
  ListItemText,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function ButtonComp(props) {
  return (
    <>
      <button
        style={{
          border: "1px solid white",
          background: "none",
          color: "white",
          padding: "10px 20px",
          fontWeight: "normal",
          fontSize: "14px",
        }}
      >
        button text
      </button>
    </>
  );
}

function TextComp(props) {
  return (
    <>
      <p>Lorem Ipsum</p>
    </>
  );
}

function ImageComp(props) {
  return (
    <>
      <img
        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/image-picture-973-svgrepo-com.png"
        alt="image"
      />
    </>
  );
}

function LinkComp(props) {
  return (
    <>
      <a>link test</a>
    </>
  );
}

function HandleContent(props) {
  switch (props) {
    case "button":
      return <ButtonComp />;
    case "text":
      return <TextComp />;
    case "image":
      return <ImageComp />;
    case "link":
      return <LinkComp />;
    default:
      return "Unknown";
  }
}

function Home(props) {
  const [collapseFullscreen, setCollapseFullscreen] = React.useState(false);
  const [isInsert, setIsInsert] = React.useState(false);
  const [isOnForm, setIsOnForm] = React.useState(false);
  const [onFormType, setOnFormType] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [contentType, setContentType] = React.useState(null);

  return (
    <Box p={2}>
      <Grid container justifyContent="center">
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

            {isInsert && !onFormType && (
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
                      <Typography align="center">One Column</Typography>
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
                      <Typography align="center">2 Column</Typography>
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
                      <Typography align="center">Image Left</Typography>
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
                      <Typography align="center">Image Right</Typography>
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
                      onClick={() => {
                        setIsOnForm(true);
                        setOnFormType("options");
                      }}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            {isInsert && isOnForm && onFormType === "options" && (
              <>
                <List sx={{ width: "95%" }}>
                  <ListItemButton
                    sx={{ borderBottom: "2px solid #C1C1C1" }}
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    <ListItemText primary="Options" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                    sx={{ p: 2 }}
                  >
                    <Typography variant="h6">Card Settings</Typography>

                    <Box mt={1} mb={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Card label name"
                      />
                    </Box>

                    <Typography variant="h6">Background</Typography>

                    <Box mt={1} mb={2}>
                      <Button
                        component="label"
                        variant="outlined"
                        fullWidth
                        sx={{
                          mb: 2,
                          color: "#C1C1C1",
                          borderColor: "#C1C1C1",
                          "&:hover": {
                            borderColor: "#C1C1C1",
                          },
                        }}
                        size="medium"
                      >
                        Select Media{" "}
                        <input style={{ display: "none" }} type="file" />
                      </Button>
                      <TextField
                        fullWidth
                        type="color"
                        size="small"
                        label="Color"
                      />
                    </Box>

                    <Typography variant="h6">Options</Typography>

                    <Box my={1}>
                      <FormControl size="small" fullWidth>
                        <InputLabel id="visibility">Visibility</InputLabel>
                        <Select labelId="visibility" label="Visibility">
                          <MenuItem value={true}>Visible</MenuItem>
                          <MenuItem value={false}>Hidden</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Collapse>
                </List>

                <Box
                  sx={{
                    backgroundColor: "#2e353b",
                    width: "89%",
                    p: 0.5,
                    px: 2,
                    borderRadius: "5px",
                  }}
                >
                  <Typography color="#fff">Row</Typography>
                </Box>

                <Box
                  sx={{
                    ml: "4%",
                    width: "100%",
                    mt: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#2e353b",
                      width: "85%",
                      p: 0.5,
                      px: 2,
                      borderRadius: "5px",
                    }}
                  >
                    <Typography color="#fff">
                      Column{" "}
                      <span style={{ color: "rgb(193 188 188)" }}>2/2</span>
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  sx={{
                    ml: "8%",
                    borderRadius: "10px",
                    mt: 1,
                  }}
                  color="secondary"
                  onClick={() => setOnFormType("element")}
                >
                  + Add to column
                </Button>
              </>
            )}

            {isInsert && isOnForm && onFormType === "element" && (
              <>
                <Typography sx={{ mt: 2 }}>Insert Content</Typography>

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
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setContentType("button");
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-button.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">Button</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      mt={0}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setContentType("text");
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-text.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">Text</Typography>
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
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setContentType("image");
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-ux_image.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">Image</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4}>
                    <Box
                      border="1px solid #00a3d3"
                      m={1}
                      p={1}
                      pt={0}
                      ml={0}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setContentType("link");
                      }}
                    >
                      <img
                        src="https://staging.cms.abracadabra-starquest.events/assets/backend/assets/images/new-card-link.svg"
                        alt="image"
                        width="100%"
                        height="80px"
                      />
                      <Typography align="center">Link</Typography>
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
                        setOnFormType(null);
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

        <Grid item xs={collapseFullscreen ? 11.5 : 8.5} position="relative">
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
                    onClick={() => setOnFormType("element")}
                  >
                    {contentType ? HandleContent(contentType) : "Add elements"}
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
                    onClick={() => setOnFormType("element")}
                  >
                    {contentType ? HandleContent(contentType) : "Add elements"}
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
                    onClick={() => setOnFormType("element")}
                  >
                    {contentType ? HandleContent(contentType) : "Add elements"}
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
                    onClick={() => setOnFormType("element")}
                  >
                    {contentType ? HandleContent(contentType) : "Add elements"}
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
                    onClick={() => setOnFormType("element")}
                  >
                    {contentType ? HandleContent(contentType) : "Add elements"}
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
