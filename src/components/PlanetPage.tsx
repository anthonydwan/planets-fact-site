import { useParams, useSearchParams } from 'react-router-dom';
// import data from '../data.json';
import { useEffect, useState } from 'react';
import { PlanetPageProps } from '../types/PlanetPageProps';
import { PlanetData } from '../types/PlanetData';

const PlanetPage = (props: PlanetPageProps) => {
  const { planetName } = useParams();
  const [data, setData] = useState<PlanetData[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({
    contentType: 'overview',
  });

  const contentType = searchParams.get('contentType');

  const planetData: PlanetData | undefined = data.find(
    (planet) => planet.name.toLowerCase() === planetName?.toLowerCase()
  );

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Determine which data to display based on the selected contentType
  const getData = (): {
    content: string;
    source: string;
    imagePlanetPath: string;
    imageGeologyPath: string;
  } => {
    let content = 'not found';
    let source = 'not found';
    let imagePlanetPath = '';
    let imageGeologyPath = '';

    if (planetData) {
      if (contentType === 'overview') {
        content = planetData.overview.content;
        source = planetData.overview.source;
        imagePlanetPath = planetData.images.planet;
      } else if (contentType === 'structure') {
        content = planetData.structure.content;
        source = planetData.structure.source;
        imagePlanetPath = planetData.images.internal;
      } else if (contentType === 'geology') {
        content = planetData.geology.content;
        source = planetData.geology.source;
        imagePlanetPath = planetData.images.planet;
        imageGeologyPath = planetData.images.geology;
      }
    }
    return { content, source, imagePlanetPath, imageGeologyPath };
  };

  const { content, source, imagePlanetPath, imageGeologyPath } = getData();

  const getClassPlanetName = (planetName: string | undefined): string => {
    if (planetName) {
      return `switch--${planetName}`;
    } else {
      return 'switch--earth';
    }
  };

  const getSwitchButtonClass = (setType: string): string => {
    return `switch__button  ${
      contentType === setType
        ? getClassPlanetName(planetName)
        : 'switch--disabled'
    }`;
  };

  return (
    <main data-visible={props.isNavActive ? 'true' : 'false'}>
      <section className="switch switch--mobile">
        <button
          className={getSwitchButtonClass('overview')}
          onClick={() =>
            setSearchParams((prev) => {
              prev.set('contentType', 'overview');
              return prev;
            })
          }
        >
          Overview
        </button>
        <button
          className={getSwitchButtonClass('structure')}
          onClick={() =>
            setSearchParams((prev) => {
              prev.set('contentType', 'structure');
              return prev;
            })
          }
        >
          Structure
        </button>
        <button
          className={getSwitchButtonClass('geology')}
          onClick={() =>
            setSearchParams((prev) => {
              prev.set('contentType', 'geology');
              return prev;
            })
          }
        >
          Geology
        </button>
      </section>
      <section className="textSwitchFigureContainer">
        <section className="figureContainer">
          <figure className="figure">
            <img
              className="figure__image"
              src={imagePlanetPath.replace('./', '/')}
            />
            {contentType === 'geology' ? (
              <img className="figure__geology" src={imageGeologyPath} />
            ) : (
              <></>
            )}
          </figure>
        </section>
        <section className="textSwitchContainer">
          <section className="text">
            <h1 className="text__heading">
              {planetData ? planetData.name : 'earth'}
            </h1>
            <p className="text__body">{content}</p>
            <div className="text__source">
              <div className="text__sourceBox">
                <p>
                  Source:{' '}
                  <a className="text__sourceLink" href={source}>
                    Wikipedia
                  </a>
                </p>
              </div>
              <a className="text__sourceLink" href={source}>
                <img
                  className="text__sourceImg"
                  src={'/assets/icon-source.svg'}
                />
              </a>
            </div>
          </section>
          <section className="switch switch--nonMobile">
            <button
              className={getSwitchButtonClass('overview')}
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('contentType', 'overview');
                  return prev;
                })
              }
            >
              <span className="switch__buttonNumber" aria-hidden="true">
                01
              </span>
              Overview
            </button>
            <button
              className={getSwitchButtonClass('structure')}
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('contentType', 'structure');
                  return prev;
                })
              }
            >
              <span className="switch__buttonNumber" aria-hidden="true">
                02
              </span>
              Internal Structure
            </button>
            <button
              className={getSwitchButtonClass('geology')}
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('contentType', 'geology');
                  return prev;
                })
              }
            >
              <span className="switch__buttonNumber" aria-hidden="true">
                03
              </span>
              Surface Geology
            </button>
          </section>
        </section>
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
