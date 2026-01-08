
import { Activiti} from "@prisma/client"


export interface ActivityResponse {
    id: number
    title: string
    description: string
    start_date: string
    end_date: string
    start_time: string
    end_time: string
}

export interface ActivityCreateUpdateRequest {
    title: string
    description: string
    start_date: string
    end_date: string
    start_time: string
    end_time: string
}

export function toActivityResponse(activity: Activiti) : ActivityResponse {
    return {
        id: activity.id,
        title: activity.title,
        description: activity.description,
        start_date: activity.start_date,
        end_date: activity.end_date,
        start_time: activity.start_time,
        end_time: activity.end_time,
    }
}

export const toActivityResponseArray = (activities: Activiti[]): ActivityResponse[] => 
    activities.map(toActivityResponse)