import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        _id
        username
        email
        savedGoals {
            _id
            tasks {
                _id
                name
                completed
            }
            startDate
            endDate
            streak
          }
    }
`;
