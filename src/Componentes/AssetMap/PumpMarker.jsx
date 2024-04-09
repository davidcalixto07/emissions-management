import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { ReactDOM } from "react";
import PcpIcon from "../../Assets/svgs/PcpSystem.svg";

const PumpMarker = ({
  position,
  color,
  icon,
  label = "asas",
  type = "RPS",
  children,
}) => {
  const RPSIcon = `
    <svg  fill="${color}" stroke="black" strokeWidth="0.05" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	viewBox="0 0 460.369 460.369"
	 xml:space="preserve">
<g>
	<path d="M410.501,399.081h-19.326v-98.201c0-2.587-2.1-4.685-4.688-4.685h-21.812V221.16l2.283,0.945
		c1.174,0.485,2.387,0.715,3.582,0.715c3.676,0,7.166-2.179,8.66-5.787l13.336-32.207c0.949-2.297,0.949-4.876-0.002-7.172
		c-0.951-2.296-2.775-4.119-5.072-5.07L184.937,88.729c7.402-14.116,14.053-28.497,19.77-42.741
		c1.912-4.766-0.367-10.183-5.111-12.146L119.594,0.715c-4.74-1.965-10.186,0.255-12.201,4.978
		C87.584,52.08,74.807,103.779,67.182,168.392c-0.492,4.166,1.846,8.151,5.723,9.756l34.289,14.196
		c3.871,1.604,8.342,0.439,10.941-2.854c14.873-18.861,27.713-36.576,39.252-54.157l40.48,16.76l-1.992,13.795l-6.035,41.782
		l-27.639,191.411H97.502H49.868c-5.174,0-9.369,4.193-9.369,9.369V451c0,5.174,4.195,9.369,9.369,9.369h360.633
		c5.174,0,9.369-4.195,9.369-9.369v-42.55C419.87,403.274,415.675,399.081,410.501,399.081z M345.937,296.195h-21.812
		c-2.59,0-4.688,2.098-4.688,4.685v98.201h-21.27L270.526,207.67l-3.913-27.112l79.321,32.844v82.793H345.937z M253.386,232.734
		l-32.929-24.563l26.187-22.133L253.386,232.734z M242.394,250.168l-41.762,26.553l7.523-52.095L242.394,250.168z M257.989,264.605
		l10.059,69.673l-54.205-41.605L257.989,264.605z M217.803,399.081l53.958-39.097l5.646,39.097H217.803z M236.198,167.963
		l-22.623,19.118l3.881-26.878L236.198,167.963z M196.508,305.269l56.203,43.141l-69.727,50.521L196.508,305.269z"/>
</g>
</svg>
  `;

  const mapIcon = type === "PCP" ? PcpIcon : type === "ESP" ? RPSIcon : RPSIcon;

  const customIcon = new L.DivIcon({
    html: `<div class='div-icon' style='color:'#F0FFF0'>
				<image url= ${PcpIcon}> </image> 
				
				<span style="position: absolute; top: 100%; left: 100%; transform: translate(-50%, -50%); color:#FFFFFF;font-weight:800;background-color:transparent">PCP</span>
                <span style="color:#0505A0;font-weight:600;background-color:whitesmoke">${label}</span>
                </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    iconUrl: PcpIcon,
    className: "custom-marker",
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>{children}</Popup>
    </Marker>
  );
};

export default PumpMarker;
