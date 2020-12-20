import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps'


const WrappedMap = withScriptjs(withGoogleMap(({coords}) => 
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: coords[0], lng: coords[1] }}
    >
        <Marker
            position={{
                lat: coords[0],
                lng: coords[1]
            }}
        ></Marker>
    </GoogleMap>
))

export default function MapResult({coords}) {
    return (
        <div style={{width:"50vw", height: "50vh"}}>
            <WrappedMap
                coords={coords}
                googleMapURL={`
                    https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLEMAPS}
                `}
                loadingElement={<div style={{height: "100%"}}> </div>}
                containerElement={<div style={{height: "100%"}}> </div>}
                mapElement={<div style={{height: "100%"}}> </div>}
            >

            </WrappedMap>
        </div>
    )
}