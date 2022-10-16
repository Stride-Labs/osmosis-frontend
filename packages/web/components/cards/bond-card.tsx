import Image from "next/image";
import { FunctionComponent, useState } from "react";
import classNames from "classnames";
import { BondableDuration } from "@osmosis-labs/stores";
import { NewButton } from "../buttons";
import { RatePretty } from "@keplr-wallet/unit";

export const BondCard: FunctionComponent<
  BondableDuration & { onUnbond: () => void }
> = ({
  duration,
  userShares,
  aggregateApr,
  superfluid,
  incentivesBreakdown,
  onUnbond,
}) => {
  const [drawerUp, setDrawerUp] = useState(false);

  return (
    <div className="relative flex flex-col gap-[115px] overflow-hidden w-full h-[360px] max-w-[348px] rounded-2xl bg-osmoverse-800 border-2 border-osmoverse-600 p-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-start place-content-between">
          <span className="subtitle1 text-osmoverse-100">
            {duration.humanize()} unbonding
          </span>
          <NewButton
            className="!text-osmoverse-400 z-50"
            mode="tertiary"
            size="sm"
            onClick={onUnbond}
          >
            Unbond
          </NewButton>
        </div>
        <div className="flex flex-col text-osmoverse-100">
          <h3>
            {userShares.hideDenom(true).trim(true).maxDecimals(3).toString()}
          </h3>
          <span>shares</span>
        </div>
      </div>
      <div
        className={classNames(
          "absolute w-full h-full top-0 left-1/2 -translate-x-1/2 bg-osmoverse-1000 transition-opacity duration-300",
          drawerUp ? "opacity-70" : "opacity-0 -z-10"
        )}
        onClick={() => setDrawerUp(false)}
      />
      <Drawer
        aggregateApr={aggregateApr}
        incentivesBreakdown={incentivesBreakdown}
        superfluid={superfluid}
        drawerUp={drawerUp}
        toggleDetailsVisible={() => setDrawerUp(!drawerUp)}
      />
    </div>
  );
};

const Drawer: FunctionComponent<{
  aggregateApr: RatePretty;
  incentivesBreakdown: BondableDuration["incentivesBreakdown"];
  superfluid: BondableDuration["superfluid"];
  drawerUp: boolean;
  toggleDetailsVisible: () => void;
}> = ({
  aggregateApr,
  incentivesBreakdown,
  superfluid,
  drawerUp,
  toggleDetailsVisible,
}) => {
  return (
    <div
      className={classNames(
        "absolute w-full h-full -bottom-[255px] left-1/2 -translate-x-1/2 flex flex-col transition-all duration-300 ease-inOutBack z-50",
        {
          "-translate-y-[170px] bg-osmoverse-700 rounded-t-[18px]": drawerUp,
        }
      )}
    >
      <div
        className={classNames(
          "flex items-end place-content-between transition-all py-4 px-8",
          {
            "border-b border-osmoverse-600": drawerUp,
          }
        )}
      >
        <div className="flex flex-col">
          <span className="subtitle1 text-osmoverse-200">Incentives</span>
          <div className="flex items-center gap-4">
            <h5
              className={classNames(
                superfluid
                  ? "text-transparent bg-clip-text bg-superfluid"
                  : "text-bullish"
              )}
            >
              {aggregateApr.maxDecimals(0).toString()} APR
            </h5>
            <div
              className={classNames(
                "flex items-center gap-1 transition-opacity duration-300",
                drawerUp ? "opacity-0" : "opacity-100"
              )}
            >
              {incentivesBreakdown
                .map((breakdown) => ({
                  denom: breakdown.dailyPoolReward.denom,
                  coinImageUrl: breakdown.dailyPoolReward.currency.coinImageUrl,
                }))
                .filter(({ coinImageUrl }) => coinImageUrl !== undefined)
                .map(({ denom, coinImageUrl }, index) => (
                  <div key={denom}>
                    {index === 2 && incentivesBreakdown.length > 3 ? (
                      <span className="caption text-osmoverse-400">
                        +{incentivesBreakdown.length - 2}
                      </span>
                    ) : index < 2 ? (
                      <Image
                        alt="incentive icon"
                        src={coinImageUrl!}
                        height={24}
                        width={24}
                      />
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <button
          className="flex items-center cursor-pointer"
          onClick={toggleDetailsVisible}
        >
          <span className="caption text-osmoverse-400">Details</span>
          <div
            className={classNames("flex items-center transition-transform", {
              "rotate-180": drawerUp,
            })}
          >
            <Image
              alt="details"
              src="/icons/chevron-up-osmoverse-400.svg"
              height={30}
              width={30}
            />
          </div>
        </button>
      </div>
      <div
        className={classNames("flex flex-col place-content-between h-[44%]", {
          "bg-osmoverse-700": drawerUp,
        })}
      >
        <div className="flex flex-col max-h-[110px] gap-5 py-6 px-8 overflow-y-scroll">
          {incentivesBreakdown.map((breakdown, index) => (
            <>
              {superfluid && index === 0 ? (
                <>
                  <SuperfluidBreakdownRow {...superfluid} />
                  <IncentiveBreakdownRow {...breakdown} />
                </>
              ) : (
                <IncentiveBreakdownRow {...breakdown} />
              )}
            </>
          ))}
        </div>
        <span className="caption text-center text-osmoverse-400">
          Rewards distributed to all liquidity providers
        </span>
      </div>
    </div>
  );
};

const SuperfluidBreakdownRow: FunctionComponent<
  BondableDuration["superfluid"]
> = ({
  apr,
  commission,
  delegated,
  undelegating,
  validatorMoniker,
  validatorLogoUrl,
}) => (
  <div className="flex items-center place-content-between" key="superfluid">
    <div className="flex items-center gap-2">
      <h6 className="text-osmoverse-200">{apr.maxDecimals(2).toString()}</h6>
      {validatorLogoUrl && (
        <img
          className="rounded-full"
          alt="validator icon"
          src={validatorLogoUrl}
          height={24}
          width={24}
        />
      )}
    </div>
    <div className="flex flex-col text-right">
      <span>{validatorMoniker}</span>
      <span className="caption text-osmoverse-400">
        {commission?.toString()}
        {delegated
          ? `, ${delegated.maxDecimals(2).toString()} delegated`
          : undelegating
          ? `, ${undelegating.maxDecimals(2).toString()} undelegating`
          : null}
      </span>
    </div>
  </div>
);

const IncentiveBreakdownRow: FunctionComponent<
  BondableDuration["incentivesBreakdown"][0]
> = ({ dailyPoolReward, apr, numDaysRemaining }) => (
  <div
    className="flex items-center place-content-between"
    key={dailyPoolReward.denom}
  >
    <div className="flex items-center gap-2">
      <h6 className="text-osmoverse-200">{apr.maxDecimals(2).toString()}</h6>
      {dailyPoolReward.currency.coinImageUrl && (
        <Image
          alt="token icon"
          src={dailyPoolReward.currency.coinImageUrl}
          height={24}
          width={24}
        />
      )}
    </div>
    <div className="flex flex-col text-right">
      <span>{dailyPoolReward.maxDecimals(0).toString()} / day</span>
      {numDaysRemaining && (
        <span className="caption text-osmoverse-400">{numDaysRemaining}</span>
      )}
    </div>
  </div>
);
