import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useApi } from '../hooks/useApi';

export function AdPlacement({ id }) {
  const { deliveryApi } = useApi();

  const [ad, setAd] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const ad = await deliveryApi.fetchAd(id);
        setAd(ad);
      } catch (e) {
        /* empty */
      }
    };

    initialize();
  }, []);

  if (!ad) {
    return null;
  }

  return <div>📢 &nbsp; {ad.body} &nbsp; 📢</div>;
}

AdPlacement.propTypes = {
  id: PropTypes.string.isRequired,
};
