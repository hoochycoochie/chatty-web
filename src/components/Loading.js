import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Loading = () => (
  <div>
    <Segment>
      <Dimmer active inverted>
        <Loader inverted size="big">Loading</Loader>
      </Dimmer>

      <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Monument_de_la_Renaissance_africaine.JPG/260px-Monument_de_la_Renaissance_africaine.JPG" />
    </Segment>
  </div>
);
export default Loading;
