/**
 * Custom Hook that builds on useLocation to parse the query string
 */

import { useLocation } from 'react-router';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default useQuery;
