import { gql } from "@apollo/client";

export const GET_CONTAINERS = gql`
  query Containers($skipCache: Boolean!) {
    docker {
      containers(skipCache: $skipCache) {
        id
        names
        labels
        state
        status
        autoStart
        ports {
          publicPort
        }
      }
    }
  }
`;

export const STOP_CONTAINER = gql`
  mutation($stopId: PrefixedID!) {
    docker {
      stop(id: $stopId) {
        id
        names
      }
    }
  }
`;

export const START_CONTAINER = gql`
  mutation($startId: PrefixedID!) {
    docker {
      start(id: $startId) {
        names
        state
        id
      }
    }
  }
`;
