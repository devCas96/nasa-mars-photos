import Input from '@/components/atoms/input/input';
import Toggle from '@/components/atoms/toggle/toggle';
import { formatDate, getCurrentDate } from '@/utils/date-handler';
import { SyntheticEvent } from 'react';
import styles from './rover-images-search.module.css';
import { CameraTypes } from '@/constants/dummy';

interface Props {
  toggleState: { value: boolean; handleClick: () => void; },
  dateInputState: { value: string; setter: (e: SyntheticEvent<HTMLInputElement, Event>) => void; },
  sunInputState: { value: string; setter: (e: SyntheticEvent<HTMLInputElement, Event>) => void; },
  cameraState: { value: string; setter: (e: SyntheticEvent<HTMLSelectElement, Event>) => void; },
}

const RoverImagesSearch = ({ toggleState, dateInputState, sunInputState, cameraState }: Props) => {
  return (
    <div className={styles.search}>

      <h1 className={styles.search__title}>Searching Photos by: </h1>
      <h2 className={styles.search__subtitle}>{toggleState.value ? 'SUN' : 'EARTH'} DATE</h2>

      <Toggle
        state={{
          value: toggleState.value,
          handleClick: () => { toggleState.handleClick(); },
        }}
      />
      <div className={styles.search__filters}>
        {!toggleState.value ?
          <Input
            className={styles.search__filters__input}
            value={dateInputState.value}
            max={formatDate(getCurrentDate())}
            type='date'
            name='dateearth'
            onChange={dateInputState.setter}
          />
          :
          <Input
            className={styles.search__filters__input}
            placeholder='Sun date'
            min={0}
            type='number'
            name='datesun'
            value={sunInputState.value}
            onChange={sunInputState.setter}
          />
        }
        <select className={styles.search__filters__select} value={cameraState.value} onChange={cameraState.setter}>
          <option value=''>All</option>
          {Object.values(CameraTypes).map((camera, index) => <option key={index} value={camera} >{camera}</option>)}
        </select>
      </div>
    </div>
  );
};

export default RoverImagesSearch;