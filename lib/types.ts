export type HomePageRace = {
    race_id: string;
    race_name: string;
    date: string;
    first_place_id: string;
    first_place_name: string;
    second_place_id: string;
    second_place_name: string;
    third_place_id: string;
    third_place_name: string;
  }

  export type HomePageRankingRider = {
    rider_id: string
    name: string
    points: number
    team: string
  }
  
  export type RiderProfile = {
    id: string;
    name: string;
    team: string;
    birthplace: string;
    activeSince: number; 
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
    raceId: string
    type: string
  }
  
  export interface FullRiderProfile {
    profile: {
      id: string
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
      points: number 
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
    id: string;
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
  };
  
  export type RaceResultRow = {
    position: number;
    riderId: string;
    riderName: string;
    team: string;
    time?: string;
    points: number;
  };
  
  export type RiderRaceResult = {
    raceName: string
    position: string
  }
  
  export type RidersTop100 = {
    riderId: string
    firstName: string
    lastName: string
    team: string
    points: number
    lastRaces: RiderRaceResult[]
  }
  