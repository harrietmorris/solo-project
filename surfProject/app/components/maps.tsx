import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapStyles from '../styling/components/map';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type MapCompProps = {
  initialPosition: {
    latitude: number;
    longitude: number;
  };
  onMarkerPositionChanged: (position: { latitude: number; longitude: number }) => void;
  markers?: Array<{ latitude: number; longitude: number }>;
};

const MapComp: React.FC<MapCompProps> = ({ initialPosition, onMarkerPositionChanged, markers }) => {
  const [markerPosition, setMarkerPosition] = useState(initialPosition);

  const handleMarkerDragEnd = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newPosition = { latitude, longitude };
    setMarkerPosition(newPosition);
    onMarkerPositionChanged(newPosition);
  };

  return (
    <View style={MapStyles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={MapStyles.map}
        initialRegion={{
          ...initialPosition,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker
          coordinate={markerPosition}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
        {markers?.map((marker, index) => (
          <Marker key={index} coordinate={marker} />
        ))}
      </MapView>
    </View>
  );
};

export default MapComp;
