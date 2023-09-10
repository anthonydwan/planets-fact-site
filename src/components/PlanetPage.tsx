import { useParams } from 'react-router-dom';
import data from '../data.json';
import { useState } from 'react';

const gallery = Object.values(
  import.meta.glob('../assets/*.{png,svg}', {
    eager: true,
    as: 'url',
  })
);

const PlanetPage = () => {
  const { planetName } = useParams();
  const [contentType, setContentType] = useState('overview');

  const planetData = data.find(
    (planet) => planet.name.toLowerCase() === planetName?.toLowerCase()
  );

  // Determine which data to display based on the selected contentType
  let content: string;
  let source: string;
  let imagePlanetPath: string;
  let imageGeologyPath: string;

  const parseImagePath = (inputPath: string): string => {
    const prefixToReplace = './assets/';
    const replacementPrefix = '/src/assets/';
    const convertedPath = inputPath.replace(prefixToReplace, replacementPrefix);
    return convertedPath;
  };

  const getData = () => {
    if (contentType === 'overview') {
      content = planetData?.overview.content;
      source = planetData?.overview.source;
      imagePlanetPath = parseImagePath(planetData?.images.planet);
    } else if (contentType === 'structure') {
      content = planetData?.structure.content;
      source = planetData?.structure.source;
      imagePlanetPath = parseImagePath(planetData?.images.internal);
    } else if (contentType === 'geology') {
      content = planetData?.geology.content;
      source = planetData?.geology.source;
      imagePlanetPath = parseImagePath(planetData?.images.planet);
      imageGeologyPath = parseImagePath(planetData?.images.geology);
    }
    return content, source, imagePlanetPath, imageGeologyPath;
  };

  getData();

  const getClassPlanetName = (planetName: string): string => {
    return `switch--${planetName}`;
  };

  const getSwitchButtonClass = (setType: string): string => {
    return `switch__button  ${
      contentType === setType
        ? getClassPlanetName(planetName)
        : 'switch--disabled'
    }`;
  };

  return (
    <main>
      <section className="switch">
        <button
          className={getSwitchButtonClass('overview')}
          onClick={() => setContentType('overview')}
        >
          Overview
        </button>
        <button
          className={getSwitchButtonClass('structure')}
          onClick={() => setContentType('structure')}
        >
          Structure
        </button>
        <button
          className={getSwitchButtonClass('geology')}
          onClick={() => setContentType('geology')}
        >
          Geology
        </button>
      </section>
      <figure className="figure">
        {gallery
          .filter((image) => image === imagePlanetPath)
          .map((image) => (
            <img className="figure__image" src={`${image}`} />
          ))}
      </figure>
      {/* {isGeology ? <img src={`${imageGeologyPath}`} /> : <p></p>} */}
      <section className="text">
        <h1 className="text__heading">{planetData?.name}</h1>
        <p className="text__body">{content}</p>
        <div className="text__source">
          <p>
            Source: <a href={source}>Wikipedia</a>
          </p>
        </div>
      </section>

      <section className="data">
        <div className="data__group">
          <h4 className="data__label">rotation time</h4>
          <h2 className="data__stat">{planetData?.rotation}</h2>
        </div>
        <div className="data__group">
          <h4 className="data__label">revolution time</h4>
          <h2 className="data__stat">{planetData?.revolution}</h2>
        </div>
        <div className="data__group">
          <h4 className="data__label">radius</h4>
          <h2 className="data__stat">{planetData?.radius}</h2>
        </div>
        <div className="data__group">
          <h4 className="data__label">average temp.</h4>
          <h2 className="data__stat">{planetData?.temperature}</h2>
        </div>
      </section>
    </main>
  );
};

export default PlanetPage;
