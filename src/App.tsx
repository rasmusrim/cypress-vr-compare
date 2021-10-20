import React, { useState } from "react";
import images from "./images.json";
import ReactCompareImage from "react-compare-image";
import { Button, Tab, Tabs, Typography } from "@material-ui/core";

function App() {
  const [imageIndex, setImageIndex] = useState(0);
  const [tab, setTab] = useState(0);

  const sortedImages = images.sort((image1, image2) => {
    if (!image1.diff || !image1.actual) {
      return -1;
    }

    if (!image2.diff || !image2.actual) {
      return 1;
    }

    return +image2.hasDiff - +image1.hasDiff })

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setImageIndex(imageIndex - 1)}
        disabled={imageIndex === 0}
      >
        Forrige bilde
      </Button>
      {imageIndex + 1 + " / " + sortedImages.length}

      <Button
        color="primary"
        variant="contained"
        onClick={() => setImageIndex(imageIndex + 1)}
        disabled={imageIndex === sortedImages.length - 1}
      >
        Neste bilde
      </Button>
      <Typography variant="h1">{sortedImages[imageIndex].filename.split("/").slice(-2).join("/")}</Typography>

      {images[imageIndex].actual && sortedImages[imageIndex].diff && (
        <>
          <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)}>
            <Tab label="Difference" />
            <Tab label="Slider" />
          </Tabs>

          <TabPanel value={0} index={tab}>
            <img src={"data:image/png;base64, " + sortedImages[imageIndex].diff} />
          </TabPanel>
          <TabPanel value={1} index={tab}>
            <div>
              <ReactCompareImage
                key={imageIndex}
                rightImageLabel="Actual"
                leftImageLabel="Base"
                rightImage={"data:image/png;base64, " + sortedImages[imageIndex].actual}
                leftImage={"data:image/png;base64, " + sortedImages[imageIndex].base}
              />
            </div>
          </TabPanel></>
      )}

      {(!sortedImages[imageIndex].actual || !sortedImages[imageIndex].diff) && (
        <h1>Actual or diff file is missing. Is there a fatal error somewhere in the image creation?</h1>

      )}
    </div>
  );
}

export default App;

interface TabPanelProps {
  value: number;
  index: number;
  children: React.ReactElement;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
