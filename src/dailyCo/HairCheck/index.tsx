/* eslint-disable no-unused-vars */

import {
  DailyVideo,
  useDaily,
  useDailyEvent,
  useDevices,
  useLocalSessionId,
  useParticipantProperty,
} from '@daily-co/daily-react';
import { Field, Label, Select } from '@headlessui/react';
import clsx from 'clsx';
import { TileButton } from 'components/Buttons';
import Drawer from 'components/Drawer';
import { Heading2 } from 'components/Typography/Heading';
import { useAuth } from 'context/AuthContext';
import PlaceholderTile from 'dailyCo/PlaceholderTile';
import UserMediaError from 'dailyCo/UserMediaError';
import React, { useCallback, useEffect, useState } from 'react';
import {
  CiMicrophoneOff,
  CiMicrophoneOn,
  CiSettings,
  CiVideoOff,
  CiVideoOn,
} from 'react-icons/ci';
import { IoChevronDownOutline } from 'react-icons/io5';

export default function HairCheck({
  joinCall,
  cancelCall,
}: {
  joinCall: (user_name: string) => void;
  cancelCall: () => void;
}) {
  const localSessionId = useLocalSessionId();
  const initialUsername = useParticipantProperty(localSessionId, 'user_name');
  const {
    currentCam,
    currentMic,
    currentSpeaker,
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
  } = useDevices();
  const callObject = useDaily();
  const { user } = useAuth();
  const [username, setUsername] = useState(initialUsername);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [openSettingDrwawer, setOpenSettingDrwawer] = useState<boolean>(false);

  const [getUserMediaError, setGetUserMediaError] = useState(false);

  useEffect(() => {
    console.log(initialUsername);
    setUsername(initialUsername);
  }, [initialUsername]);

  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  const handleChange = (e: any) => {
    setUsername(e.target.value);
    callObject?.setUserName(e.target.value);
  };

  const handleJoin = (e: any) => {
    e.preventDefault();
    joinCall(username?.trim());
  };

  const updateMicrophone = (e: any) => {
    setMicrophone(e.target.value);
  };

  const updateSpeakers = (e: any) => {
    setSpeaker(e.target.value);
  };

  const updateCamera = (e: any) => {
    setCamera(e.target.value);
  };

  const toggleCamera = () => {
    if (cameraOn) {
      callObject?.setLocalVideo(false);
    } else {
      callObject?.setLocalVideo(true);
    }
    setCameraOn((prevState) => !prevState);
  };
  const toggleMic = () => {
    if (cameraOn) {
      callObject?.setLocalAudio(false);
    } else {
      callObject?.setLocalAudio(true);
    }
    setMicOn((prevState) => !prevState);
  };

  const toggleSettingDrawer = () => {
    setOpenSettingDrwawer((prevState) => !prevState);
  };

  return getUserMediaError ? (
    <UserMediaError />
  ) : (
    <>
      <Drawer
        isOpen={openSettingDrwawer}
        closeDrawer={toggleSettingDrawer}
        className="p-4 top-0 bottom-0"
        title="Settings"
      >
        <div className="mb-2">
          <Field>
            <Label className="text-sm leading-none font-medium text-black dark:text-white">
              Microphone
            </Label>
            <div className="relative">
              <Select
                className={clsx(
                  'mt-3 block w-full appearance-none rounded-lg border-none bg-black/20 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-balck dark:text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  // Make the text of each option black on Windows
                  '*:text-black',
                )}
                name="micOptions"
                onChange={updateMicrophone}
                value={currentMic?.device?.deviceId}
              >
                {microphones.map((mic) => (
                  <option key={`mic-${mic.device.deviceId}`} value={mic.device.deviceId}>
                    {mic.device.label}
                  </option>
                ))}
              </Select>
              <IoChevronDownOutline
                size={16}
                className="group pointer-events-none absolute top-2.5 right-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>
        {/* Speakers select */}
        <div className="mb-2">
          <Field>
            <Label className="text-sm leading-none font-medium text-black dark:text-white">
              Speakers
            </Label>
            <div className="relative">
              <Select
                className={clsx(
                  'mt-3 block w-full appearance-none rounded-lg border-none bg-black/20 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-balck dark:text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  // Make the text of each option black on Windows
                  '*:text-black',
                )}
                name="speakersOptions"
                id="speakersSelect"
                onChange={updateSpeakers}
                value={currentSpeaker?.device?.deviceId}
              >
                {speakers.map((speaker) => (
                  <option
                    key={`speaker-${speaker.device.deviceId}`}
                    value={speaker.device.deviceId}
                  >
                    {speaker.device.label}
                  </option>
                ))}
              </Select>
              <IoChevronDownOutline
                size={16}
                className="group pointer-events-none absolute top-2.5 right-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>
        <div className="mb-2">
          <Field>
            <Label className="text-sm leading-none font-medium text-black dark:text-white">
              Camera
            </Label>
            <div className="relative">
              <Select
                className={clsx(
                  'mt-3 block w-full appearance-none rounded-lg border-none bg-black/20 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-balck dark:text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  // Make the text of each option black on Windows
                  '*:text-black',
                )}
                name="cameraOptions"
                id="cameraSelect"
                onChange={updateCamera}
                value={currentCam?.device?.deviceId}
              >
                {cameras.map((camera) => (
                  <option
                    key={`cam-${camera.device.deviceId}`}
                    value={camera.device.deviceId}
                  >
                    {camera.device.label}
                  </option>
                ))}
              </Select>
              <IoChevronDownOutline
                size={16}
                className="group pointer-events-none absolute top-2.5 right-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>
      </Drawer>
      <form className="hair-check h-full" onSubmit={handleJoin}>
        <Heading2 className="text-center mt-8 mb-4">Ready to Join?</Heading2>
        <div className="grid grid-cols-12 gap-4 ">
          <div className="xs:col-span-1 md:col-span-3" />
          <div className="xs:col-span-10 md:col-span-6 flex flex-col justify-center items-center">
            <div className="relative w-full">
              <div className="video-placeholder bg-gray-300 dark:bg-gray-700 shadow-2xl rounded-xl relative overflow-hidden">
                {localSessionId && cameraOn ? (
                  <DailyVideo sessionId={localSessionId} mirror type={'video'} />
                ) : (
                  <PlaceholderTile />
                )}
              </div>
              <div className="absolute bottom-2 left-1/2 p-3 gap-x-2 -translate-x-1/2 bg-black/30 backdrop-blur-md flex items-center justify-center rounded-full">
                <TileButton
                  onClick={toggleCamera}
                  icon={cameraOn ? <CiVideoOn /> : <CiVideoOff />}
                  iconClassName=" border-white text-black dark:text-white  hover:bg-blue-700/90 hover:text-white hover:border-blue-500"
                />
                <TileButton
                  onClick={toggleMic}
                  icon={micOn ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
                  iconClassName=" border-white text-black dark:text-white  hover:bg-blue-700/90 hover:text-white hover:border-blue-500"
                />
                <TileButton
                  onClick={toggleSettingDrawer}
                  icon={<CiSettings />}
                  iconClassName=" border-white text-black dark:text-white  hover:bg-blue-700/90 hover:text-white hover:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="xs:col-span-12 md:col-span-12 flex flex-col items-center justify-center">
            <div>
              <label htmlFor="username">Your name:</label>
              <input
                name="username"
                type="text"
                placeholder="Enter username"
                onChange={handleChange}
                value={username || ' '}
              />
            </div>

            <div className="flex items-center gap-x-4 mt-4">
              <button
                onClick={cancelCall}
                className="px-6 py-2 rounded-full font-normal text-xl border border-red-500  text-red-500 hover:text-white hover:bg-red-500"
                type="button"
              >
                Hang Up
              </button>

              <button
                onClick={handleJoin}
                className="px-6 py-2 rounded-full font-normal text-xl border border-green-500  text-green-500 hover:text-white hover:bg-green-500"
                type="submit"
              >
                Let&apos;s Go!
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
