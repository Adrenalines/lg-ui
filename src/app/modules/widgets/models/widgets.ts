import { ApiResponse } from '../../../core/models/api';

export interface WidgetsResponse extends ApiResponse {
  data: Entities;
}

export interface Entities {
  companies: Company[];
  containers: Container[];
  smartPoints: SmartPoints;
  widgets: Widget[];
}

export interface Company {
  id: string;
  name: string;
  default: boolean;
}

export interface Container {
  id: string;
  description: string;
  name: string;
  widgets: WidgetType[];
}

export interface SmartPoints {
  "enabled": true;
  "list": SmartPoint[];
}

export interface SmartPoint {
  enabled: boolean;
  autoinvite: boolean;
  pos: string;
  type: string;
}

export interface Widget {
  type: WidgetType[];
}

export interface WidgetType {
  id: string;
  name: string;
  type: string;
  template: string;
  companyId: string;
  active: boolean;
  abtestInfo: AbtestInfo;
}

export interface AbtestInfo {
  id: string;
  type: string;
}
