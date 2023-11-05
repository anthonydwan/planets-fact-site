import { useParams, useSearchParams } from 'react-router-dom';
// import data from '../data.json';
import { useEffect, useState } from 'react';
import { PlanetPageProps } from '../types/PlanetPageProps';
import { PlanetData } from '../types/PlanetData';

const PlanetPage = (props: PlanetPageProps) => {
  let { planetName } = useParams();
  const defaultPlanetName = 'earth';
  const [data, setData] = useState<PlanetData[]>([]);
  const [planetData, setPlanetData] = useState<PlanetData | undefined>(
    undefined
  );
  const [content, setContent] = useState('not found');
  const [wikiSource, setWikiSource] = useState('not found');
  const [imagePlanetPath, setImagePlanetPath] = useState('');
  const [imageGeologyPath, setImageGeologyPath] = useState('');

  const [searchParams, setSearchParams] = useSearchParams({
    contentType: 'overview',
  });

  const contentType = searchParams.get('contentType');

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data.json')
      .then((response) => response.json())
      .then((fetchedData: PlanetData[]) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (!planetName || !isValidPlanetName(planetName)) {
      planetName = defaultPlanetName;
    }
    setPlanetData(
      data.find(
        (planet) => planet.name.toLowerCase() === planetName?.toLowerCase()
      )
    );
  }, [planetName, defaultPlanetName, data]);

  // Determine which data to display based on the selected contentType
  useEffect(() => {
    if (planetData) {
      if (contentType === 'overview') {
        setContent(planetData.overview.content);
        setWikiSource(planetData.overview.source);
        setImagePlanetPath(planetData.images.planet);
      } else if (contentType === 'structure') {
        setContent(planetData.structure.content);
        setWikiSource(planetData.structure.source);
        setImagePlanetPath(planetData.images.internal);
      } else if (contentType === 'geology') {
        setContent(planetData.geology.content);
        setWikiSource(planetData.geology.source);
        setImagePlanetPath(planetData.images.planet);
        setImageGeologyPath(planetData.images.geology);
      }
    }
  }, [contentType, planetData]);

  const isValidPlanetName = (name: string | undefined): boolean => {
    // You can implement your own validation logic here based on the valid planet names in your data
    // For example, you can compare `name` with a list of valid planet names
    const validPlanetNames = [
      'earth',
      'mars',
      'venus',
      'mercury',
      'jupiter',
      'neptune',
      'saturn',
      'uranus',
    ];
    return validPlanetNames.includes(name?.toLowerCase() || '');
  };

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
            <img className="figure__image" src={imagePlanetPath} />
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
                  <a className="text__sourceLink" href={wikiSource}>
                    Wikipedia
                  </a>
                </p>
              </div>
              <a className="text__sourceLink" href={wikiSource}>
                <img
                  className="text__sourceImg"
                  src={import.meta.env.BASE_URL + '/assets/icon-source.svg'}
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
