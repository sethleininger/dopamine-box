import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      goals {
        _id
        name
        tasks {
          _id
          name
          completed
        }
        startDate
        endDate
        streak
        datesCompleted
      }
    }
  }
`;
