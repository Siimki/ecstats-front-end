export type HomePageRace = {
    race_id: number;
    race_name: string;
    date: string;
    first_place: number;
    first_place_name: string;
    second_place: number;
    second_place_name: string;
    third_place: number;
    third_place_name: string;
  }

  export type HomePageRankingRider = {
    rider_id: number
    name: string
    points: number
    team: string
  }
  
  export type RiderProfile = {
    id: number;
    name: string;
    team: string;
    birthplace: string;
    activeSince: number;     // year
    rankingPoints: number;
    rankingPlace: number;
  };
  
  export type RiderPartnerships = {
    frame: string;
    tyres: string;
    clothing: string;
    bikeShop: string;
    sponsor: string;
  };
  
  export type RiderTotals = {
    participations: number;
    wins: number;
    podiums: number;
    careerPoints: number;
  };
  
  export type RiderSeasonStats = {
    year: number;
    races: number;
    wins: number;
    podiums: number;
    points: number;
  };

  export type RiderTopResult = {
    race: string;
    date: string;
    position: number;
    points: number;
  };
  

  export type RiderResult = {
    season: number
    date: string
    race: string
    category: string
    position: number
    points: number
    raceId: number
    type: string
  }
  
  export interface FullRiderProfile {
    profile: {
      id: number
      name: string
      team: string
      birthplace: string
      activeSince: number
      rankingPointsRoad: number
      rankingPlaceRoad: number
      rankingPointsMTB: number
      rankingPlaceMTB: number
    }
    partnerships: {
      frame: string
      tyres: string
      clothing: string
      bikeShop: string
      sponsor: string
    }
    totals: {
      participations: number
      wins: number
      podiums: number
      careerPoints: number
    }
    seasonStats: {
      year: number
      races: number
      wins: number
      podiums: number
      points: number // Use `points`, NOT `seasonPoints`
    }[]
    results: RiderResult[]
    topResults: {
      race: string
      date: string
      position: number
      points: number
    }[]
  }
  
  export type RaceProfile = {
    race: RaceDetails;
    results: RaceResultRow[];
  };
  
  export type RaceDetails = {
    id: number;
    date: string;
    name: string;
    category: string;
    location: string;
    distance: number;
    elevation: number;
    roughness?: string;
    startTime: string;
    temperature: number;
    totalParticipants: number;
    // Add more direct fields if needed
  };
  
  export type RaceResultRow = {
    position: number;
    riderId: number;
    riderName: string;
    team: string;
    time?: string;
    points: number;
  };
  